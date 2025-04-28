<?php

namespace App\Http\Controllers\Web\Hr;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::DIVISIONS_ALL, 
                PermissionCode::DIVISIONS_READ, 
                PermissionCode::DIVISIONS_DELETE,
                PermissionCode::DIVISIONS_CREATE,
                PermissionCode::DIVISIONS_UPDATE,
            )) {
                return redirect()->back()->withErrors(['message' => 'Unauthorized']);
            }

            return $next($request);
        })->only(['index']);
    }

    public function index()
    {
        return Inertia::render('app/Divisions');
    }
}
