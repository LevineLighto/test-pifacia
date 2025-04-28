<?php

namespace App\Logics\Hr;

use App\Constants\Activity\ActivityAction;
use App\Models\Hr\Division;
use App\Models\Hr\Position;
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
}