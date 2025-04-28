<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Logics\Auth\AuthenticationLogic;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        return (new AuthenticationLogic())->login($request);
    }

    public function logout()
    {
        return (new AuthenticationLogic)->logout();
    }
}
