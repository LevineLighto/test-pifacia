import { FC, useCallback, useContext } from "react";
import { PositionFilterContext } from "./context";
import { PositionFilterContextType } from "./types";
import { Form } from "@/components/forms";
import { Input, InputChangeHandler, SortButton, StatusSelect } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { SortablePositionField } from "./constants";
import { useHasPermission } from "@/hooks/permission";
import { POSITIONS_GROUP_READ } from "@/constants/permissions";
import { DivisionSelect } from "../division-select";

export const PositionFilter : FC = () => {
    const canRead   = useHasPermission(POSITIONS_GROUP_READ)

    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(PositionFilterContext) as PositionFilterContextType

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
                <DivisionSelect
                    name="division_id"
                    label="Division"
                    value={filter.division_id}
                    onChange={handleChange}
                />
                <StatusSelect
                    value={filter.is_active}
                    onChange={handleChange}
                />
                <section className="flex gap-2 items-end pb-4">
                    <SortButton
                        sortable={SortablePositionField}
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