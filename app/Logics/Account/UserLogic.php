<?php

namespace App\Logics\Account;

use App\Constants\Activity\ActivityAction;
use App\Models\Account\Role;
use App\Models\Account\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserLogic
{
    public function __construct(public ?User $user = null)
    {
    }

    public function create(Request $request)
    {
        DB::beginTransaction();
        try {

            $role = Role::find($request->role_id);
            if (empty($role)) {
                error('Role not found', 404);
            }

            $emailExists = User::ofEmail($request->email)->exists();
            if ($emailExists) {
                error('This email is being used by other user', 400);
            }

            $user = auth_user();
            
            $this->user = User::create([
                'name'              => $request->name,
                'email'             => $request->email,
                'password'          => Hash::make($request->password),
                'role_id'           => $request->role_id,
                'created_by'        => $user->id,
                'created_by_name'   => $user->name,
            ]);

            $this->user->setActivityPropertyAttributes(ActivityAction::CREATE)
                ->saveActivity("Create new user: {$this->user->name} [{$this->user->id}]");
            
            DB::commit();

            return success($this->user);

        } catch (\Throwable $th) {

            DB::rollBack();
            throw $th;

        }
    }

    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            
            $role = Role::find($request->role_id);
            if (empty($role)) {
                error('Role not found', 404);
            }

            $emailExists = User::ofEmail($request->email)->where('id', '!=', $this->user->id)->exists();
            if ($emailExists) {
                error('This email is being used by other user', 400);
            }

            $user = auth_user();

            $this->user->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

            $data = [
                'name'              => $request->name,
                'email'             => $request->email,
                'role_id'           => $request->role_id,
                'updated_by'        => $user->id,
                'updated_by_name'   => $user->name,
            ];

            if (!empty($request->password)) {
                $data['password']   = Hash::make($request->password);
            }
            
            $this->user->update($data);

            $this->user->setActivityPropertyAttributes(ActivityAction::UPDATE)
                ->saveActivity("Update user: {$this->user->name} [{$this->user->id}]");
            
            DB::commit();

            return success($this->user);

        } catch (\Throwable $th) {

            DB::rollBack();
            throw $th;

        }
    }

    public function delete()
    {
        DB::beginTransaction();
        try {

            $user = auth_user();

            $user = auth_user();
            if ($this->user->id == $user->id) {
                error('Unable to delete your own self');
            }

            $this->user->setOldActivityPropertyAttributes(ActivityAction::DELETE);

            $this->user->update([
                'deleted_at'        => now(),
                'deleted_by'        => $user->id,
                'deleted_by_name'   => $user->name,
            ]);

            $this->user->setActivityPropertyAttributes(ActivityAction::DELETE)
                ->saveActivity("Delete user: {$this->user->name} [{$this->user->id}]");
            
            DB::commit();

            return success();

        } catch (\Throwable $th) {

            DB::rollBack();
            throw $th;

        }
    }
}