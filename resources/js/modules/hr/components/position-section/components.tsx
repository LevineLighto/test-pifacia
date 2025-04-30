'use client'

import { FC, useContext } from "react";
import { PositionFormContext, PositionFormContextType } from "../position-form";
import { Button } from "@/components/buttons";
import { Plus } from "react-feather";
import { PositionFilter, PositionFilterContext, PositionFilterContextType } from "../position-filter";
import { useGetPositions } from "@/hr/hooks";
import { PositionTable } from "../position-table/components";
import { useHasPermission } from "@/hooks/permission";
import { POSITIONS_GROUP_CREATE } from "@/constants/permissions";

export const PositionSection : FC = () => {
    const canCreate = useHasPermission(POSITIONS_GROUP_CREATE)

    const { 
        setOpen, setOnSuccess
    } = useContext(PositionFormContext) as PositionFormContextType

    const {
        committedFilter
    } = useContext(PositionFilterContext) as PositionFilterContextType

    const { mutate } = useGetPositions(committedFilter)

    const handleCreate = () => {
        setOpen(true)
        setOnSuccess(() => mutate)
    }

    return (
        <section>
            <header className="flex flex-wrap justify-between gap-4 mb-6">
                <h1 className="text-3xl varela-round">
                    Positions
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
            <PositionFilter/>
            <PositionTable/>
        </section>
    )
}