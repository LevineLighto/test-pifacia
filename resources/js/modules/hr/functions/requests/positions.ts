import { Position, PositionImportRequest, PositionRequest, UploadImportResponse } from "@/hr/types";
import { DELETE, POST, PUT } from "@/functions/fetch";
import { route } from "ziggy-js";

export const ExportPosition = (csrf_token: string) => {
    return POST({
        url         : route('hr.positions.export'),
        csrf_token  : csrf_token,
    })
}

export const CreatePosition = (form: PositionRequest, csrf_token: string) => {
    return POST<Position>({
        url         : route('hr.positions.create'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const UpdatePosition = (id: string, form: PositionRequest, csrf_token: string) => {
    return PUT<Position>({
        url         : route('hr.positions.update', id),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const DeletePosition = (id: string, csrf_token: string) => {
    return DELETE({
        url         : route('hr.positions.delete', id),
        csrf_token  : csrf_token,
    })
}

export const UploadImportPosition = (form: FormData, csrf_token: string) => {
    return POST<UploadImportResponse>({
        url         : route('hr.positions.import.upload'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const ImportPosition = (form: PositionImportRequest, csrf_token: string) => {
    return POST({
        url         : route('hr.positions.import'),
        data        : form,
        csrf_token  : csrf_token,
    })
}
