<?php

namespace App\Logics\Hr;

use App\Constants\Activity\ActivityAction;
use App\Jobs\Hr\ExportEmployeeJob;
use App\Models\Account\Role;
use App\Models\Account\User;
use App\Models\Hr\Employee;
use App\Models\Hr\Position;
use App\Models\Misc\ExportJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EmployeeLogic
{
    private $bpjsLocation = 'employees/bpjs';

    public function __construct(public ?Employee $employee = null)
    {
        
    }

    public function create(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            $emailExists = Employee::ofEmail($request->email)->exists();
            if ($emailExists) {
                error('Email is being used by another employee', 400);
            }

            $position = Position::find($request->position_id);
            if (empty($position)) {
                error('Unable to find position', 404);
            }

            $active_user = auth_user();

            $fileName   = '';
            $file       = null;
            if ($request->hasFile('bpjs_file')) {
                $file       = $request->file('bpjs_file');
                $extension  = $file->getClientOriginalExtension();
                $fileName   = $this->bpjsLocation . '/' . $request->email . '-' . time() . '.' . $extension;
            }

            /** @var User */
            $user = User::create([
                'name'              => $request->name,
                'email'             => $request->email,
                'password'          => Hash::make($request->password),
                'role_id'           => Role::ofCode('U')->first()->id,
                'created_by'        => $active_user->id,
                'created_by_name'   => $active_user->name,
            ]);
            
            $this->employee = Employee::create([
                'name'              => $request->name,
                'email'             => $request->email,
                'is_active'         => $request->is_active,
                'bpjs'              => $request->bpjs,
                'bpjs_file'         => $fileName,
                'joined_at'         => parse_date($request->joined_at),
                'user_id'           => $user->id,
                'position_id'       => $position->id,
                'created_by'        => $active_user->id,
                'created_by_name'   => $active_user->name,
            ]);

            $user->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Create new user [{$user->id}] for employee {$this->employee->name} [{$this->employee->id}]");

            $this->employee->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Create new employee: {$this->employee->name} [{$this->employee->id}]");

            if ($file) {
                $file->storeAs($fileName);
            }

            DB::commit();
            return success($this->employee);

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function update(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            $emailExists = Employee::ofEmail($request->email)->where('id', '!=', $this->employee->id)->exists();
            if ($emailExists) {
                error('Email is being used by another employee', 400);
            }

            $position = Position::find($request->position_id);
            if (empty($position)) {
                error('Unable to find position', 404);
            }

            $active_user = auth_user();

            $oldFileName    = $this->employee->bpjs_file;
            $fileName       = $this->employee->bpjs_file;
            $file           = null;
            if ($request->hasFile('bpjs_file')) {
                $file       = $request->file('bpjs_file');
                $extension  = $file->getClientOriginalExtension();
                $fileName   = $this->bpjsLocation . '/' . $request->email . '-' . time() . '.' . $extension;
            }

            /** @var User */
            $user = $this->employee->user;

            $user->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

            $user->update([
                'name'              => $request->name,
                'email'             => $request->email,
                'updated_by'        => $active_user->id,
                'updated_by_name'   => $active_user->name,
            ]);

            $user->setActivityPropertyAttributes(ActivityAction::UPDATE)
                ->saveActivity("Update employee {$this->employee->name}'s user detail");

            $this->employee->setOldActivityPropertyAttributes(ActivityAction::UPDATE);
            
            $this->employee->update([
                'name'              => $request->name,
                'email'             => $request->email,
                'is_active'         => $request->is_active,
                'bpjs'              => $request->bpjs,
                'bpjs_file'         => $fileName,
                'joined_at'         => parse_date($request->joined_at),
                'position_id'       => $position->id,
                'updated_by'        => $active_user->id,
                'updated_by_name'   => $active_user->name,
            ]);

            $this->employee->setActivityPropertyAttributes(ActivityAction::UPDATE)
                ->saveActivity("Update employee: {$this->employee->name} [{$this->employee->id}]");

            if ($file) {
                $file->storeAs($fileName);

                if ($oldFileName && Storage::exists($oldFileName)) {
                    Storage::delete($oldFileName);
                }
            }

            DB::commit();
            return success($this->employee);

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function delete() : mixed
    {
        DB::beginTransaction();
        try {

            $active_user = auth_user();
            if ($this->employee->user_id == $active_user->id) {
                error('Unable to delete your own self');
            }

            /** @var User */
            $user = $this->employee->user;

            $user->setOldActivityPropertyAttributes(ActivityAction::DELETE);
            
            $user->update([
                'deleted_at'        => now(),
                'deleted_by'        => $active_user->id,
                'deleted_by_name'   => $active_user->name,
            ]);

            $user->setActivityPropertyAttributes(ActivityAction::DELETE)
                ->saveActivity("Delete employee {$this->employee->name}'s user");

            $this->employee->setOldActivityPropertyAttributes(ActivityAction::DELETE);
            
            $this->employee->update([
                'deleted_at'        => now(),
                'deleted_by'        => $active_user->id,
                'deleted_by_name'   => $active_user->name,
            ]);

            $this->employee->setActivityPropertyAttributes(ActivityAction::DELETE)
                ->saveActivity("Delete employee: {$this->employee->name} [{$this->employee->id}]");

            DB::commit();
            return success();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function export()
    {
        DB::beginTransaction();
        try {

            $user = auth_user();

            $exportExists = ExportJob::where('model', Employee::class)
                ->where('created_by', $user->id)
                ->whereNull('completed_at')
                ->exists();
            if ($exportExists) {
                error('Your previous request is being generated, please wait for that one to complete', 400);
            }

            /** @var ExportJob */
            $export = ExportJob::create([
                'model'             => Employee::class,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $export->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Exporting employee data");

            ExportEmployeeJob::dispatch($user);

            DB::commit();
            return success();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }
}