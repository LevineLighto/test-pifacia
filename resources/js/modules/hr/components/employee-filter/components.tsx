import { FC, useCallback, useContext } from "react";
import { EmployeeFilterContext } from "./context";
import { EmployeeFilterContextType } from "./types";
import { Form } from "@/components/forms";
import { Daterangepicker, Input, InputChangeHandler, SortButton } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { SortableEmployeeField } from "./constants";
import { useHasPermission } from "@/hooks/permission";
import { EMPLOYEES_GROUP_READ } from "@/constants/permissions";
import { PositionSelect } from "../position-select";

export const EmployeeFilter : FC = () => {
    const canRead   = useHasPermission(EMPLOYEES_GROUP_READ)

    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(EmployeeFilterContext) as EmployeeFilterContextType

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
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-3"
                onSubmit={handleSubmit}
            >
                <Input
                    name="search"
                    label="Search"
                    value={filter.search}
                    onChange={handleChange}
                />
                <PositionSelect
                    name="position_id"
                    label="Position"
                    value={filter.position_id}
                    onChange={handleChange}
                />
                <Daterangepicker
                    label="Joined At"
                    fromDateName="joined_from"
                    fromDate={filter.joined_from}
                    toDateName="joined_to"
                    toDate={filter.joined_to}
                    onChange={handleChange}
                />
                <section className="flex gap-2 items-end pb-4">
                    <SortButton
                        sortable={SortableEmployeeField}
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