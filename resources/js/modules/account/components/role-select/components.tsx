import { FC, useCallback, useState } from "react";
import { RoleSelectProps } from "./props";
import { RoleFilter } from "@/account/types";
import { SearchableSelect } from "@/components/inputs";
import { useGetRoles } from "@/account/hooks";

export const RoleSelect : FC<RoleSelectProps> = ({
    searchPlaceholder = 'Select Role...',
    ...props
}) => {
    const [filter, setFilter] = useState<RoleFilter>({
        search      : '',
        is_active   : '1',
        page        : 1,
        limit       : 10,
    })

    const { data: roles, isLoading } = useGetRoles(filter)

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