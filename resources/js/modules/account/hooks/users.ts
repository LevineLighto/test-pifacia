import { useSwr } from "@/hooks/swr";
import { User, UserFilter } from "../types";
import { route } from "ziggy-js";

export const useGetUsers = (filter: UserFilter) => useSwr<User[]>(route('accounts.users.get'), filter)
export const useFindUser = (user_id: string) => useSwr<User>(user_id ? route('accounts.users.find', user_id) : null)