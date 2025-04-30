import { FC, useCallback, useState } from "react";
import { DivisionSelectProps } from "./props";
import { DivisionFilter } from "@/hr/types";
import { SearchableSelect } from "@/components/inputs";
import { useGetDivisions } from "@/hr/hooks";

export const DivisionSelect : FC<DivisionSelectProps> = ({
    searchPlaceholder = 'Select Division...',
    ...props
}) => {
    const [filter, setFilter] = useState<DivisionFilter>({
        search      : '',
        is_active   : '1',
        page        : 1,
        limit       : 10,
    })

    const { data: roles, isLoading } = useGetDivisions(filter)

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