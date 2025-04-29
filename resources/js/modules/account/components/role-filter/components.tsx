import { FC, useCallback, useContext } from "react";
import { RoleFilterContext } from "./context";
import { RoleFilterContextType } from "./types";
import { Form } from "@/components/forms";
import { Input, InputChangeHandler, SortButton, StatusSelect } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { List } from "react-feather";
import { SortableRoleField } from "./constants";

export const RoleFilter : FC = () => {
    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(RoleFilterContext) as RoleFilterContextType

    const handleChange = useCallback<InputChangeHandler>(({ name, value }) => {
        setFilter((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }, [setFilter])

    const handleSubmit = () => {
        setCommittedFilter((prevState) => ({...filter}))
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
                <StatusSelect
                    value={filter.is_active}
                    onChange={handleChange}
                />
                <section className="flex gap-2 items-end pb-4">
                    <SortButton
                        sortable={SortableRoleField}
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