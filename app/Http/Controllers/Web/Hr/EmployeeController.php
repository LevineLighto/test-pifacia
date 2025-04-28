<?php

namespace App\Http\Controllers\Web\Hr;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::EMPLOYEES_ALL, 
                PermissionCode::EMPLOYEES_READ, 
                PermissionCode::EMPLOYEES_DELETE,
                PermissionCode::EMPLOYEES_CREATE,
                PermissionCode::EMPLOYEES_UPDATE,
            )) {
                return redirect()->back()->withErrors(['message' => 'Unauthorized']);
            }

            return $next($request);
        })->only(['index']);
    }

    public function index()
    {
        return Inertia::render('app/Employees');
    }
}
