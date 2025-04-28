<?php

namespace App\Http\Controllers\Api\Account;

use App\Http\Controllers\Controller;
use App\Models\Account\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function get(Request $request)
    {
        $permissions = Permission::filter($request)->get();
        return success($permissions);
    }
}
