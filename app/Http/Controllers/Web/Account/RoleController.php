<?php

namespace App\Http\Controllers\Web\Account;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::ROLES_ALL, 
                PermissionCode::ROLES_READ, 
                PermissionCode::ROLES_DELETE,
                PermissionCode::ROLES_CREATE,
                PermissionCode::ROLES_UPDATE,
                PermissionCode::PERMISSION_ASSIGN,
            )) {
                return redirect()->back()->withErrors(['message' => 'Unauthorized']);
            }

            return $next($request);
        })->only(['index']);
    }

    public function index()
    {
        return Inertia::render('app/Roles');
    }
}
