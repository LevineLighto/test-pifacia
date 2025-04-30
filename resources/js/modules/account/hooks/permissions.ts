import { useSwr } from "@/hooks/swr"
import { Permission } from "../types"
import { route } from "ziggy-js"

export const useGetPermission = (filter?: Record<string, any>) => {
    return useSwr<Permission[]>(route('accounts.permissions.get'))
}