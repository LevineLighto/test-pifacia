'use client'

import { FC, useContext } from "react";
import { RoleFormContext, RoleFormContextType } from "../role-form";
import { Button } from "@/components/buttons";
import { Plus } from "react-feather";
import { RoleFilter, RoleFilterContext, RoleFilterContextType } from "../role-filter";
import { useGetRoles } from "@/account/hooks";
import { RoleTable } from "../role-table/components";

export const RoleSection : FC = () => {
    const { 
        setOpen, setOnSuccess
    } = useContext(RoleFormContext) as RoleFormContextType

    const {
        committedFilter
    } = useContext(RoleFilterContext) as RoleFilterContextType

    const { mutate } = useGetRoles(committedFilter)

    const handleCreate = () => {
        setOpen(true)
        setOnSuccess(() => mutate)
    }

    return (
        <section>
            <header className="flex flex-wrap justify-between gap-4 mb-6">
                <h1 className="text-3xl varela-round">
                    Roles
                </h1>
                <Button
                    type="button"
                    className="flex items-center"
                    onClick={handleCreate}
                >
                    <Plus size="1.5rem"/> Create
                </Button>
            </header>
            <RoleFilter/>
            <RoleTable/>
        </section>
    )
}