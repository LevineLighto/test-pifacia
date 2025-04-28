<?php

namespace App\Http\Controllers\Web\Account;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::USERS_ALL, 
                PermissionCode::USERS_READ, 
                PermissionCode::USERS_DELETE,
                PermissionCode::USERS_CREATE,
                PermissionCode::USERS_UPDATE,
            )) {
                return redirect()->back()->withErrors(['message' => 'Unauthorized']);
            }

            return $next($request);
        });
    }

    public function index()
    {
        return Inertia::render('app/Users');
    }
}
