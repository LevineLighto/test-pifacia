import { User, UserRequest } from "@/account/types";
import { DELETE, POST, PUT } from "@/functions/fetch";
import { route } from "ziggy-js";

export const CreateUser = (form: UserRequest, csrf_token: string) => {
    return POST<User>({
        url         : route('accounts.users.create'),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const UpdateUser = (id: string, form: UserRequest, csrf_token: string) => {
    return PUT<User>({
        url         : route('accounts.users.update', id),
        data        : form,
        csrf_token  : csrf_token,
    })
}

export const DeleteUser = (id: string, csrf_token: string) => {
    return DELETE({
        url         : route('accounts.users.delete', id),
        csrf_token  : csrf_token,
    })
}
