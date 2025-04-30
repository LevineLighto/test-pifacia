import { createContext, FC, PropsWithChildren, useState } from "react";
import { DivisionFilterContextType } from "./types";
import { DivisionFilter } from "@/hr/types";

export const DivisionFilterContext = createContext<DivisionFilterContextType | null>(null)
export const DivisionFilterProvider : FC<PropsWithChildren> = ({ children }) => {
    const [filter, setFilter] = useState<DivisionFilter>({
        search      : '',
        is_active   : '',
        page        : 1,
        limit       : 50,
        sort_by     : '',
        sort_dir    : '',
    })
    
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <DivisionFilterContext
            value={{
                filter, setFilter,
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </DivisionFilterContext>
    )
}