<?php

namespace App\Logics\Hr;

use App\Constants\Activity\ActivityAction;
use App\Jobs\Hr\ExportPositionJob;
use App\Models\Hr\Division;
use App\Models\Hr\Position;
use App\Models\Misc\ExportJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PositionLogic
{
    public function __construct(public ?Position $position = null)
    {
        
    }

    public function create(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            $division = Division::find($request->division_id);
            if (empty($division)) {
                error('Unable to find division', 404);
            }

            $user = auth_user();
            
            $this->position = Position::create([
                'name'              => $request->name,
                'code'              => $request->code,
                'is_active'         => $request->is_active,
                'scope'             => $request->scope,
                'division_id'       => $division->id,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $this->position->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Create new position: {$this->position->name} [{$this->position->id}]");

            DB::commit();
            return success($this->position);

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function update(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            $division = Division::find($request->division_id);
            if (empty($division)) {
                error('Unable to find division', 404);
            }

            $user = auth_user();

            $this->position->setOldActivityPropertyAttributes(ActivityAction::UPDATE);
            
            $this->position->update([
                'name'              => $request->name,
                'code'              => $request->code,
                'is_active'         => $request->is_active,
                'scope'             => $request->scope,
                'division_id'       => $division->id,
                'updated_by'        => $user->id,
                'updated_by_name'   => $user->name,
            ]);

            $this->position->setActivityPropertyAttributes(ActivityAction::UPDATE)
                ->saveActivity("Update position: {$this->position->name} [{$this->position->id}]");

            DB::commit();
            return success($this->position);

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

            $this->position->setOldActivityPropertyAttributes(ActivityAction::DELETE);
            
            $this->position->update([
                'deleted_at'        => now(),
                'deleted_by'        => $user->id,
                'deleted_by_name'   => $user->name,
            ]);

            $this->position->setActivityPropertyAttributes(ActivityAction::DELETE)
                ->saveActivity("Delete position: {$this->position->name} [{$this->position->id}]");

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

            $exportExists = ExportJob::where('model', Position::class)
                ->where('created_by', $user->id)
                ->whereNull('completed_at')
                ->exists();
            if ($exportExists) {
                error('Your previous request is being generated, please wait for that one to complete', 400);
            }

            /** @var ExportJob */
            $export = ExportJob::create([
                'model'             => Position::class,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $export->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Exporting position data");

            ExportPositionJob::dispatch($user);

            DB::commit();
            return success();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }
}