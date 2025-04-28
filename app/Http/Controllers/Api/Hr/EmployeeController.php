<?php

namespace App\Http\Controllers\Api\Hr;

use App\Http\Controllers\Controller;
use App\Http\Requests\Hr\CreateEmployeeRequest;
use App\Http\Requests\Hr\UpdateEmployeeRequest;
use App\Logics\Hr\EmployeeLogic;
use App\Models\Hr\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function get(Request $request)
    {
        $employees = Employee::filter($request)->paginate($request->limit ?: 50);

        return success($employees);
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

        return response()->file(storage_path('app/' . $employee->bpjs_file));
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
}
