import { createContext, FC, PropsWithChildren, useState } from "react";
import { RoleFilterContextType } from "./types";
import { RoleFilter } from "@/account/types";

export const RoleFilterContext = createContext<RoleFilterContextType | null>(null)
export const RoleFilterProvider : FC<PropsWithChildren> = ({ children }) => {
    const [filter, setFilter] = useState<RoleFilter>({
        search      : '',
        is_active   : '',
        page        : 1,
        limit       : 50,
        sort_by     : '',
        sort_dir    : '',
    })
    
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <RoleFilterContext
            value={{
                filter, setFilter,
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </RoleFilterContext>
    )
}