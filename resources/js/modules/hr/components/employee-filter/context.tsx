import { createContext, FC, PropsWithChildren, useState } from "react";
import { EmployeeFilterContextType } from "./types";
import { EmployeeFilter } from "@/hr/types";

export const EmployeeFilterContext = createContext<EmployeeFilterContextType | null>(null)
export const EmployeeFilterProvider : FC<PropsWithChildren> = ({ children }) => {
    const [filter, setFilter] = useState<EmployeeFilter>({
        search      : '',
        position_id : '',
        joined_from : '',
        joined_to   : '',
        is_active   : '',
        page        : 1,
        limit       : 50,
        sort_by     : '',
        sort_dir    : '',
    })
    
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <EmployeeFilterContext
            value={{
                filter, setFilter,
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </EmployeeFilterContext>
    )
}