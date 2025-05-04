<?php

namespace App\Http\Controllers\Api\Hr;

use App\Constants\Auth\PermissionCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Hr\CreateEmployeeRequest;
use App\Http\Requests\Hr\EmployeeImportRequest;
use App\Http\Requests\Hr\UpdateEmployeeRequest;
use App\Http\Requests\Hr\UploadImportRequest;
use App\Logics\Hr\EmployeeLogic;
use App\Models\Hr\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::EMPLOYEES_ALL, PermissionCode::EMPLOYEES_READ)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['get', 'find', 'export']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::EMPLOYEES_ALL, PermissionCode::EMPLOYEES_CREATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['create', 'uploadImport', 'import']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::EMPLOYEES_ALL, PermissionCode::EMPLOYEES_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['update']);

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::EMPLOYEES_ALL, PermissionCode::EMPLOYEES_UPDATE)) {
                error('Unauthorized', 401);
            }

            return $next($request);
        })->only(['delete']);
    }

    public function get(Request $request)
    {
        $employees = Employee::filter($request)
            ->with(['position', 'position.division'])
            ->paginate($request->limit ?: 50);

        return success($employees);
    }

    public function export()
    {
        return (new EmployeeLogic())->export();
    }

    public function find($id)
    {
        $employee = Employee::find($id);
        if (empty($employee)) {
            error('Employee not found', 404);
        }

        return success($employee);
    }

    public function bpjs($id)
    {
        $employee = Employee::find($id);
        if (empty($employee)) {
            error('Employee not found', 404);
        }

        if (empty($employee->bpjs_file)) {
            error('File does not exist', 404);
        }

        return response()->file(storage_path('app/private/' . $employee->bpjs_file));
    }

    public function create(CreateEmployeeRequest $request)
    {
        return (new EmployeeLogic())->create($request);
    }

    public function update(UpdateEmployeeRequest $request, $id)
    {
        $employee = Employee::find($id);
        if (empty($employee)) {
            error('Employee not found', 404);
        }

        return (new EmployeeLogic($employee))->update($request);
    }

    public function delete($id)
    {
        $employee = Employee::find($id);
        if (empty($employee)) {
            error('Employee not found', 404);
        }

        return (new EmployeeLogic($employee))->delete();
    }

    public function uploadImport(UploadImportRequest $request)
    {
        return (new EmployeeLogic())->uploadImport($request);
    }

    public function import(EmployeeImportRequest $request)
    {
        return (new EmployeeLogic())->import($request);
    }
}
