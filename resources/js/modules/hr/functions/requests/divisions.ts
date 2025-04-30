import { Division, DivisionRequest } from "@/hr/types";
import { DELETE, POST, PUT } from "@/functions/fetch";
import { route } from "ziggy-js";

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
