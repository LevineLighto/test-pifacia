<?php

namespace App\Http\Controllers\Api\Account;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use App\Models\Account\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PERMISSION_ASSIGN)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only('get');
    }

    public function get(Request $request)
    {
        $permissions = Permission::filter($request)->get();
        return success($permissions);
    }
}
