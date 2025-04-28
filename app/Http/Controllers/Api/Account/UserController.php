<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\CreateUserRequest;
use App\Http\Requests\Account\UpdateUserRequest;
use App\Logics\Account\UserLogic;
use App\Models\Account\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
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
