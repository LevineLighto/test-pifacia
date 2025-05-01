<?php

namespace App\Http\Controllers\Api\Hr;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Hr\PositionRequest;
use App\Logics\Hr\PositionLogic;
use App\Models\Hr\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::POSITIONS_ALL, PermissionCode::POSITIONS_READ)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['get', 'find']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::POSITIONS_ALL, PermissionCode::POSITIONS_CREATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['create']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::POSITIONS_ALL, PermissionCode::POSITIONS_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['update']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::POSITIONS_ALL, PermissionCode::POSITIONS_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['delete']);
    }

    public function get(Request $request)
    {
        $positions = Position::filter($request)
            ->with(['division'])
            ->paginate($request->limit ?: 50);

        return success($positions);
    }

    public function find($id)
    {
        $position = Position::find($id);
        if (empty($position)) {
            error('Position not found', 404);
        }

        return success($position);
    }

    public function create(PositionRequest $request)
    {
        return (new PositionLogic())->create($request);
    }

    public function update(PositionRequest $request, $id)
    {
        $position = Position::find($id);
        if (empty($position)) {
            error('Position not found', 404);
        }

        return (new PositionLogic($position))->update($request);
    }

    public function delete($id)
    {
        $position = Position::find($id);
        if (empty($position)) {
            error('Position not found', 404);
        }

        return (new PositionLogic($position))->delete();
    }
}
