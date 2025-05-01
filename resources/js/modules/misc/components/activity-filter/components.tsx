import { FC, useCallback, useContext } from "react";
import { ActivityFilterContext } from "./context";
import { ActivityFilterContextType } from "./types";
import { Form } from "@/components/forms";
import { Daterangepicker, Input, InputChangeHandler, SortButton, StatusSelect } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { SortableActivityField } from "./constants";
import { useHasPermission } from "@/hooks/permission";
import { DIVISIONS_GROUP_READ } from "@/constants/permissions";

export const ActivityFilter : FC = () => {
    const canRead   = useHasPermission(DIVISIONS_GROUP_READ)

    const {
        filter, setFilter,
        setCommittedFilter
    } = useContext(ActivityFilterContext) as ActivityFilterContextType

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
                <Daterangepicker
                    label="Date"
                    fromDate={filter.from_date}
                    fromDateName="from_date"
                    toDate={filter.to_date}
                    toDateName="to_date"
                    onChange={handleChange}
                />
                <section className="flex gap-2 items-end pb-4">
                    <SortButton
                        sortable={SortableActivityField}
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