<?php

namespace App\Http\Controllers\Api\Hr;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Hr\DivisionRequest;
use App\Logics\Hr\DivisionLogic;
use App\Models\Hr\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::DIVISIONS_ALL, PermissionCode::DIVISIONS_READ)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['get', 'find', 'export']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::DIVISIONS_ALL, PermissionCode::DIVISIONS_CREATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['create']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::DIVISIONS_ALL, PermissionCode::DIVISIONS_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['update']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::DIVISIONS_ALL, PermissionCode::DIVISIONS_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['delete']);
    }

    public function get(Request $request)
    {
        $divisions = Division::filter($request)->paginate($request->limit ?: 50);

        return success($divisions);
    }

    public function export()
    {
        return (new DivisionLogic())->export();
    }

    public function find($id)
    {
        $division = Division::find($id);
        if (empty($division)) {
            error('Division not found', 404);
        }

        return success($division);
    }

    public function create(DivisionRequest $request)
    {
        return (new DivisionLogic())->create($request);
    }

    public function update(DivisionRequest $request, $id)
    {
        $division = Division::find($id);
        if (empty($division)) {
            error('Division not found', 404);
        }

        return (new DivisionLogic($division))->update($request);
    }

    public function delete($id)
    {
        $division = Division::find($id);
        if (empty($division)) {
            error('Division not found', 404);
        }

        return (new DivisionLogic($division))->delete();
    }
}
