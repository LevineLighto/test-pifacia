import { createContext, FC, PropsWithChildren, useState } from "react";
import { PositionFilterContextType } from "./types";
import { PositionFilter } from "@/hr/types";

export const PositionFilterContext = createContext<PositionFilterContextType | null>(null)
export const PositionFilterProvider : FC<PropsWithChildren> = ({ children }) => {
    const [filter, setFilter] = useState<PositionFilter>({
        search      : '',
        is_active   : '',
        division_id : '',
        page        : 1,
        limit       : 50,
        sort_by     : '',
        sort_dir    : '',
    })
    
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <PositionFilterContext
            value={{
                filter, setFilter,
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </PositionFilterContext>
    )
}