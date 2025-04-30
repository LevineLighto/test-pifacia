import { createContext, FC, PropsWithChildren, useState } from "react";
import { UserFilterContextType } from "./types";
import { UserFilter } from "@/account/types";

export const UserFilterContext = createContext<UserFilterContextType | null>(null)
export const UserFilterProvider : FC<PropsWithChildren> = ({ children }) => {
    const [filter, setFilter] = useState<UserFilter>({
        search      : '',
        role_id     : '',
        page        : 1,
        limit       : 50,
        sort_by     : '',
        sort_dir    : '',
    })
    
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <UserFilterContext
            value={{
                filter, setFilter,
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </UserFilterContext>
    )
}