import { POST } from "@/functions/fetch";
import { LoginRequest } from "../types";
import { route } from "ziggy-js";

export const Login = async (data: LoginRequest, csrf_token: string) => {
    return POST({
        url         : route('auth.login'),
        data        : data,
        csrf_token  : csrf_token,
    })
}