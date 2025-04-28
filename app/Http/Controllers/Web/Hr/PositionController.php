<?php

namespace App\Http\Controllers\Web\Hr;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::POSITIONS_ALL, 
                PermissionCode::POSITIONS_READ, 
                PermissionCode::POSITIONS_DELETE,
                PermissionCode::POSITIONS_CREATE,
                PermissionCode::POSITIONS_UPDATE,
            )) {
                return redirect()->back()->withErrors(['message' => 'Unauthorized']);
            }

            return $next($request);
        })->only(['index']);
    }

    public function index()
    {
        return Inertia::render('app/Positions');
    }
}
