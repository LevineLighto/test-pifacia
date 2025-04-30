<?php

namespace App\Http\Controllers\Api\Misc;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use App\Models\Activity\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ACTIVITY_READ)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only('get');
    }

    public function get(Request $request)
    {
        $permissions = Activity::filter($request)->paginate($request->limit ?: 50);
        return success($permissions);
    }
}
