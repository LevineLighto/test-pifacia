import { DELETE } from "@/functions/fetch"
import { route } from "ziggy-js"

export const Logout = async (csrf_token: string) => {
    return DELETE({
        url         : route('auth.logout'),
        csrf_token  : csrf_token
    })
}