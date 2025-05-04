<?php

namespace App\Logics\Hr;

use App\Constants\Activity\ActivityAction;
use App\Jobs\Hr\ExportDivisionJob;
use App\Jobs\Hr\ImportDivisionJob;
use App\Logics\Hr\Traits\CanImport;
use App\Models\Hr\Division;
use App\Models\Misc\ExportJob;
use App\Models\Misc\ImportJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DivisionLogic
{
    use CanImport;

    public function __construct(public ?Division $division = null)
    {
        $this->model = Division::class;
    }

    public function create(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            $user = auth_user();
            
            $this->division = Division::create([
                'name'              => $request->name,
                'code'              => $request->code,
                'is_active'         => $request->is_active,
                'scope'             => $request->scope,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $this->division->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Create new division: {$this->division->name} [{$this->division->id}]");

            DB::commit();
            return success($this->division);

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function update(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            $user = auth_user();

            $this->division->setOldActivityPropertyAttributes(ActivityAction::UPDATE);
            
            $this->division->update([
                'name'              => $request->name,
                'code'              => $request->code,
                'is_active'         => $request->is_active,
                'scope'             => $request->scope,
                'updated_by'        => $user->id,
                'updated_by_name'   => $user->name,
            ]);

            $this->division->setActivityPropertyAttributes(ActivityAction::UPDATE)
                ->saveActivity("Update division: {$this->division->name} [{$this->division->id}]");

            DB::commit();
            return success($this->division);

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function delete() : mixed
    {
        DB::beginTransaction();
        try {

            $user = auth_user();

            $this->division->setOldActivityPropertyAttributes(ActivityAction::DELETE);
            
            $this->division->update([
                'deleted_at'        => now(),
                'deleted_by'        => $user->id,
                'deleted_by_name'   => $user->name,
            ]);

            $this->division->setActivityPropertyAttributes(ActivityAction::DELETE)
                ->saveActivity("Delete division: {$this->division->name} [{$this->division->id}]");

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

            $exportExists = ExportJob::where('model', Division::class)
                ->where('created_by', $user->id)
                ->whereNull('completed_at')
                ->exists();
            if ($exportExists) {
                error('Your previous request is being generated, please wait for that one to complete', 400);
            }

            /** @var ExportJob */
            $export = ExportJob::create([
                'model'             => Division::class,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $export->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Exporting division data");

            ExportDivisionJob::dispatch($user);

            DB::commit();
            return success();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function import(Request $request)
    {
        DB::beginTransaction();
        try {
            
            $this->checkJob();
            
            $user = auth_user();

            /** @var ImportJob */
            $job = ImportJob::create([
                'model'             => $this->model,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $job->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Importing division data");

            ImportDivisionJob::dispatch($user, $request->input('file'), $request->headings);

            DB::commit();
            return success();
            
        } catch (\Throwable $th) {
              
            DB::rollBack();
            throw $th;

        }
    }
}