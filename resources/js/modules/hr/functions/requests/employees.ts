import { Employee, EmployeeImportRequest, EmployeeRequest, UploadImportResponse } from "@/hr/types";
import { DELETE, POST, PUT } from "@/functions/fetch";
import { route } from "ziggy-js";

export const ExportEmployee = (csrf_token: string) => {
    return POST({
        url         : route('hr.employees.export'),
        csrf_token  : csrf_token,
    })
}

export const CreateEmployee = (form: FormData, csrf_token: string) => {
    return POST<Employee>({
        url         : route('hr.employees.create'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const UpdateEmployee = (id: string, form: FormData, csrf_token: string) => {
    return PUT<Employee>({
        url         : route('hr.employees.update', id),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const DeleteEmployee = (id: string, csrf_token: string) => {
    return DELETE({
        url         : route('hr.employees.delete', id),
        csrf_token  : csrf_token,
    })
}

export const UploadImportEmployee = (form: FormData, csrf_token: string) => {
    return POST<UploadImportResponse>({
        url         : route('hr.employees.import.upload'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const ImportEmployee = (form: EmployeeImportRequest, csrf_token: string) => {
    return POST({
        url         : route('hr.employees.import'),
        data        : form,
        csrf_token  : csrf_token,
    })
}
