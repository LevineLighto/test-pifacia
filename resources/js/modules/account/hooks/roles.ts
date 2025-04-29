import { useSwr } from "@/hooks/swr";
import { Role, RoleFilter } from "../types";
import { route } from "ziggy-js";

export const useGetRoles = (filter: RoleFilter) => useSwr<Role[]>(route('accounts.roles.get'), filter)