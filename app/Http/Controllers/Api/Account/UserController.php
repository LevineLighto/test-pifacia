<?php

namespace App\Http\Controllers\Api\Account;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\CreateUserRequest;
use App\Http\Requests\Account\UpdateUserRequest;
use App\Logics\Account\UserLogic;
use App\Models\Account\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_READ)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['get', 'find']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_CREATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['create']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['update']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['delete']);
    }

    public function get(Request $request)
    {
        $users = User::filter($request)->paginate($request->limit ?: 50);

        return success($users);
    }

    public function find($id)
    {
        $user = User::find($id);
        if (empty($user)) {
            error('User not found', 404);
        }

        return success($user);
    }

    public function create(CreateUserRequest $request)
    {
        return (new UserLogic())->create($request);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::find($id);
        if (empty($user)) {
            error('User not found', 404);
        }

        return (new UserLogic($user))->update($request);
    }

    public function delete($id)
    {
        $user = User::find($id);
        if (empty($user)) {
            error('User not found', 404);
        }

        return (new UserLogic($user))->delete();
    }
}
