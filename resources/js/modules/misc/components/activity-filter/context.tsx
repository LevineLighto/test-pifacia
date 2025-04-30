import { createContext, FC, PropsWithChildren, useState } from "react";
import { ActivityFilterContextType } from "./types";
import { ActivityFilter } from "@/misc/types";

export const ActivityFilterContext = createContext<ActivityFilterContextType | null>(null)
export const ActivityFilterProvider : FC<PropsWithChildren> = ({ children }) => {
    const [filter, setFilter] = useState<ActivityFilter>({
        search      : '',
        from_date   : '',
        to_date     : '',
        page        : 1,
        limit       : 50,
        sort_by     : 'created_at',
        sort_dir    : 'desc',
    })
    
    const [committedFilter, setCommittedFilter] = useState(filter)

    return (
        <ActivityFilterContext
            value={{
                filter, setFilter,
                committedFilter, setCommittedFilter
            }}
        >
            { children }
        </ActivityFilterContext>
    )
}