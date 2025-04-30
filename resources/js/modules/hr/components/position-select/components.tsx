import { FC, useCallback, useState } from "react";
import { PositionSelectProps } from "./props";
import { PositionFilter } from "@/hr/types";
import { SearchableSelect } from "@/components/inputs";
import { useGetPositions } from "@/hr/hooks";

export const PositionSelect : FC<PositionSelectProps> = ({
    searchPlaceholder = 'Select Position...',
    ...props
}) => {
    const [filter, setFilter] = useState<PositionFilter>({
        search      : '',
        is_active   : '1',
        page        : 1,
        limit       : 10,
    })

    const { data: roles, isLoading } = useGetPositions(filter)

    const handleSearch = useCallback((search: string) => {
        setFilter((prevState) => ({
            ...prevState,
            search: search
        }))
    }, [setFilter])

    return (
        <SearchableSelect
            itemLabelKey="name"
            onSearch={handleSearch}
            data={isLoading || !roles?.data?.length ? [] : roles.data}
            loading={isLoading}
            searchPlaceholder={searchPlaceholder}
            {...props}
        />
    )

}