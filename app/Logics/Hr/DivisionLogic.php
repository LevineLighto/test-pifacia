<?php

namespace App\Logics\Hr;

use App\Constants\Activity\ActivityAction;
use App\Models\Hr\Division;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DivisionLogic
{
    public function __construct(public ?Division $division = null)
    {
        
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
}