import { useSwr } from "@/hooks/swr";
import { Role, RoleFilter } from "../types";
import { route } from "ziggy-js";

export const useGetRoles = (filter: RoleFilter) => useSwr<Role[]>(route('accounts.roles.get'), filter)
export const useFindRole = (role_id: string) => useSwr<Role>(role_id ? route('accounts.roles.find', role_id) : null)