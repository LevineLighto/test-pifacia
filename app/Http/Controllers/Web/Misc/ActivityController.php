<?php

namespace App\Http\Controllers\Web\Misc;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ACTIVITY_READ)) {
                return redirect()->back()->withErrors(['message' => 'Unauthorized']);
            }

            return $next($request);
        })->only(['index']);
    }

    public function index()
    {
        return Inertia::render('app/Activity');
    }
}
