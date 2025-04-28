<?php

namespace App\Http\Controllers\Api\Account;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AssignPermissionRequest;
use App\Http\Requests\Account\RoleRequest;
use App\Logics\Account\RoleLogic;
use App\Models\Account\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_READ)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['get', 'find']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_CREATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['create']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['update']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['delete']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PERMISSION_ASSIGN)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['assignPermission']);
    }

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
