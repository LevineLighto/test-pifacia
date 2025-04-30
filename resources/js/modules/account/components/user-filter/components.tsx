import { FC, useCallback, useContext } from "react";
import { UserFilterContext } from "./context";
import { UserFilterContextType } from "./types";
import { Form } from "@/components/forms";
import { Input, InputChangeHandler, SortButton } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { SortableUserField } from "./constants";
import { useHasPermission } from "@/hooks/permission";
import { USERS_GROUP_READ } from "@/constants/permissions";
import { RoleSelect } from "../role-select";

export const UserFilter : FC = () => {
    const canRead   = useHasPermission(USERS_GROUP_READ)

    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(UserFilterContext) as UserFilterContextType

    const handleChange = useCallback<InputChangeHandler>(({ name, value }) => {
        setFilter((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }, [setFilter])

    const handleSubmit = () => {
        setCommittedFilter((prevState) => ({...filter}))
    }

    if (!canRead) {
        return <></>
    }

    return (
        <section className="mb-4">
            <Form
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-3"
                onSubmit={handleSubmit}
            >
                <Input
                    name="search"
                    label="Search"
                    value={filter.search}
                    onChange={handleChange}
                />
                <RoleSelect
                    name="role_id"
                    label="Role"
                    value={filter.role_id}
                    onChange={handleChange}
                />
                <section className="flex gap-2 items-end pb-4">
                    <SortButton
                        sortable={SortableUserField}
                        onChange={handleChange}
                        sort_by={filter.sort_by}
                        sort_dir={filter.sort_dir}
                    />
                    <div>
                        <Button
                            type="submit"
                        >
                            Search
                        </Button>
                    </div>
                </section>
            </Form>
        </section>
    )
}