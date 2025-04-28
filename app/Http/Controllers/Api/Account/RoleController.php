<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AssignPermissionRequest;
use App\Http\Requests\Account\RoleRequest;
use App\Logics\Account\RoleLogic;
use App\Models\Account\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function get(Request $request)
    {
        $roles = Role::filter($request)->paginate($request->limit ?: 50);

        return success($roles);
    }

    public function find($id)
    {
        $role = Role::find($id);
        if (empty($role)) {
            error('Role not found', 404);
        }

        return success($role);
    }

    public function create(RoleRequest $request)
    {
        return (new RoleLogic())->create($request);
    }

    public function update(RoleRequest $request, $id)
    {
        $role = Role::find($id);
        if (empty($role)) {
            error('Role not found', 404);
        }

        return (new RoleLogic($role))->update($request);
    }

    public function assignPermission(AssignPermissionRequest $request, $id)
    {
        $role = Role::find($id);
        if (empty($role)) {
            error('Role not found', 404);
        }

        return (new RoleLogic($role))->assignPermission($request);
    }

    public function delete($id)
    {
        $role = Role::find($id);
        if (empty($role)) {
            error('Role not found', 404);
        }

        return (new RoleLogic($role))->delete();
    }
}
