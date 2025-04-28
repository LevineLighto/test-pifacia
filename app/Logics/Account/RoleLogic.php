<?php

namespace App\Logics\Account;

use App\Constants\Activity\ActivityAction;
use App\Models\Account\Permission;
use App\Models\Account\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleLogic
{
    public function __construct(public ?Role $role = null)
    {
        
    }

    public function create(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            $user = auth_user();
            
            $this->role = Role::create([
                'name'              => $request->name,
                'code'              => $request->code,
                'is_active'         => $request->is_active,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $this->role->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Create new role: {$this->role->name} [{$this->role->id}]");

            DB::commit();
            return success($this->role);

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function update(Request $request) : mixed
    {
        DB::beginTransaction();
        try {

            if (!$this->role->editable) {
                error('This role is not editable', 400);
            }

            $user = auth_user();
            if ($this->role->id == $user->role_id) {
                error('Unable to modify your own role', 403);
            }

            $this->role->setOldActivityPropertyAttributes(ActivityAction::UPDATE);
            
            $this->role->update([
                'name'              => $request->name,
                'code'              => $request->code,
                'is_active'         => $request->is_active,
                'updated_by'        => $user->id,
                'updated_by_name'   => $user->name,
            ]);

            $this->role->setActivityPropertyAttributes(ActivityAction::UPDATE)
                ->saveActivity("Update role: {$this->role->name} [{$this->role->id}]");

            DB::commit();
            return success($this->role);

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function delete() : mixed
    {
        DB::beginTransaction();
        try {

            if (!$this->role->editable) {
                error('This role is not editable', 400);
            }

            $user = auth_user();
            if ($this->role->id == $user->role_id) {
                error('Unable to modify your own role', 403);
            }

            $this->role->setOldActivityPropertyAttributes(ActivityAction::DELETE);
            
            $this->role->update([
                'deleted_at'        => now(),
                'deleted_by'        => $user->id,
                'deleted_by_name'   => $user->name,
            ]);

            $this->role->setActivityPropertyAttributes(ActivityAction::DELETE)
                ->saveActivity("Delete role: {$this->role->name} [{$this->role->id}]");

            DB::commit();
            return success();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }

    public function assignPermission(Request $request)
    {
        DB::beginTransaction();
        try {

            $permissions = [];
            if (count($request->permission_ids)) {
                $permissions = Permission::whereIn('id', $request->permission_ids)
                    ->get();
            }

            if (count($request->permission_ids) != count($permissions)) {
                error('Unable to find some permissions', 404);
            }

            $this->role->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

            DB::table('role_has_permissions')
                ->where(function ($query) use ($request) {
                    $query->where('role_id', $this->role->id);

                    if (count($request->permission_ids)) {
                        $query->whereIn('permission_id', $request->permission_ids);
                    }
                })
                ->delete();

            $inputData = [];
            foreach ($permissions as $permission) {
                $inputData[] = [
                    'role_id'       => $this->role->id,
                    'permission_id' => $permission->id,
                ];
            }

            if (count($inputData)) {
                DB::table('role_has_permissions')
                    ->upsert($inputData, ['role_id', 'permission_id']);
            }
                
            $this->role->setActivityPropertyAttributes(ActivityAction::UPDATE)
                ->saveActivity("Assign permissions for role {$this->role->name} [{$this->role->id}]");

            Permission::cache($this->role->id);

            DB::commit();
            return success();
            
        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }
}