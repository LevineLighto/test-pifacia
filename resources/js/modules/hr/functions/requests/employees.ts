import { Employee, EmployeeRequest } from "@/hr/types";
import { DELETE, POST, PUT } from "@/functions/fetch";
import { route } from "ziggy-js";

export const CreateEmployee = (form: EmployeeRequest, csrf_token: string) => {
    return POST<Employee>({
        url         : route('hr.divisions.create'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const UpdateEmployee = (id: string, form: EmployeeRequest, csrf_token: string) => {
    return PUT<Employee>({
        url         : route('hr.divisions.update', id),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const DeleteEmployee = (id: string, csrf_token: string) => {
    return DELETE({
        url         : route('hr.divisions.delete', id),
        csrf_token  : csrf_token,
    })
}
