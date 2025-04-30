'use client'

import { FC, useContext } from "react";
import { DivisionFormContext, DivisionFormContextType } from "../division-form";
import { Button } from "@/components/buttons";
import { Plus } from "react-feather";
import { DivisionFilter, DivisionFilterContext, DivisionFilterContextType } from "../division-filter";
import { useGetDivisions } from "@/hr/hooks";
import { DivisionTable } from "../division-table/components";
import { useHasPermission } from "@/hooks/permission";
import { DIVISIONS_GROUP_CREATE } from "@/constants/permissions";

export const DivisionSection : FC = () => {
    const canCreate = useHasPermission(DIVISIONS_GROUP_CREATE)

    const { 
        setOpen, setOnSuccess
    } = useContext(DivisionFormContext) as DivisionFormContextType

    const {
        committedFilter
    } = useContext(DivisionFilterContext) as DivisionFilterContextType

    const { mutate } = useGetDivisions(committedFilter)

    const handleCreate = () => {
        setOpen(true)
        setOnSuccess(() => mutate)
    }

    return (
        <section>
            <header className="flex flex-wrap justify-between gap-4 mb-6">
                <h1 className="text-3xl varela-round">
                    Divisions
                </h1>
                { canCreate ? (
                    <Button
                        type="button"
                        className="flex items-center"
                        onClick={handleCreate}
                    >
                        <Plus size="1.5rem"/> Create
                    </Button>
                ) : (<></>) }
            </header>
            <DivisionFilter/>
            <DivisionTable/>
        </section>
    )
}