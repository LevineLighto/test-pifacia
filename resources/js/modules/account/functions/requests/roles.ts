import { Role, RoleRequest } from "@/account/types";
import { DELETE, POST, PUT } from "@/functions/fetch";
import { route } from "ziggy-js";

export const CreateRole = (form: RoleRequest, csrf_token: string) => {
    return POST<Role>({
        url         : route('accounts.roles.create'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const UpdateRole = (id: string, form: RoleRequest, csrf_token: string) => {
    return PUT<Role>({
        url         : route('accounts.roles.update', id),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const DeleteRole = (id: string, csrf_token: string) => {
    return DELETE({
        url         : route('accounts.roles.delete', id),
        csrf_token  : csrf_token,
    })
}