import { Division, DivisionImportRequest, DivisionRequest, UploadImportResponse } from "@/hr/types";
import { DELETE, POST, PUT } from "@/functions/fetch";
import { route } from "ziggy-js";

export const ExportDivision = (csrf_token: string) => {
    return POST({
        url         : route('hr.divisions.export'),
        csrf_token  : csrf_token,
    })
}

export const CreateDivision = (form: DivisionRequest, csrf_token: string) => {
    return POST<Division>({
        url         : route('hr.divisions.create'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const UpdateDivision = (id: string, form: DivisionRequest, csrf_token: string) => {
    return PUT<Division>({
        url         : route('hr.divisions.update', id),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const DeleteDivision = (id: string, csrf_token: string) => {
    return DELETE({
        url         : route('hr.divisions.delete', id),
        csrf_token  : csrf_token,
    })
}

export const UploadImportDivision = (form: FormData, csrf_token: string) => {
    return POST<UploadImportResponse>({
        url         : route('hr.divisions.import.upload'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const ImportDivision = (form: DivisionImportRequest, csrf_token: string) => {
    return POST({
        url         : route('hr.divisions.import'),
        data        : form,
        csrf_token  : csrf_token,
    })
}
