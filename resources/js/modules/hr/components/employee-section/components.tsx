'use client'

import { FC, useContext } from "react";
import { EmployeeFormContext, EmployeeFormContextType } from "../employee-form";
import { Button } from "@/components/buttons";
import { Plus } from "react-feather";
import { EmployeeFilter, EmployeeFilterContext, EmployeeFilterContextType } from "../employee-filter";
import { useGetEmployees } from "@/hr/hooks";
import { EmployeeTable } from "../employee-table/components";
import { useHasPermission } from "@/hooks/permission";
import { EMPLOYEES_GROUP_CREATE } from "@/constants/permissions";

export const EmployeeSection : FC = () => {
    const canCreate = useHasPermission(EMPLOYEES_GROUP_CREATE)

    const { 
        setOpen, setOnSuccess
    } = useContext(EmployeeFormContext) as EmployeeFormContextType

    const {
        committedFilter
    } = useContext(EmployeeFilterContext) as EmployeeFilterContextType

    const { mutate } = useGetEmployees(committedFilter)

    const handleCreate = () => {
        setOpen(true)
        setOnSuccess(() => mutate)
    }

    return (
        <section>
            <header className="flex flex-wrap justify-between gap-4 mb-6">
                <h1 className="text-3xl varela-round">
                    Employees
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
            <EmployeeFilter/>
            <EmployeeTable/>
        </section>
    )
}