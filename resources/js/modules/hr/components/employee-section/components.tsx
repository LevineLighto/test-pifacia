'use client'

import { FC, useContext, useState } from "react";
import { EmployeeFormContext, EmployeeFormContextType } from "../employee-form";
import { Button } from "@/components/buttons";
import { Download, Plus } from "react-feather";
import { EmployeeFilter, EmployeeFilterContext, EmployeeFilterContextType } from "../employee-filter";
import { useGetEmployees } from "@/hr/hooks";
import { EmployeeTable } from "../employee-table/components";
import { useHasPermission } from "@/hooks/permission";
import { EMPLOYEES_GROUP_CREATE, EMPLOYEES_GROUP_READ } from "@/constants/permissions";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { ExportEmployee } from "@/hr/functions/requests";
import { toast } from "react-toastify";
import { LoadingModal } from "@/components/modals";

export const EmployeeSection : FC = () => {
    const canCreate = useHasPermission(EMPLOYEES_GROUP_CREATE)
    const canRead   = useHasPermission(EMPLOYEES_GROUP_READ)

    const [loading, setLoading] = useState(false)
    const {props} = usePage<PageProps>()

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

    const handleExport = () => {
        if (loading) {
            return
        }
        
        setLoading(true)

        ExportEmployee(props.csrf_token)
            .then((response) => {
                if (response.status.code != 200) {
                    return
                }

                toast.success('Export request successfully queued and will be sent to your email later, please wait for a while');
            })
            .finally(() => {
                setLoading(false)
            })
    }


    return (
        <section>
            <header className="flex flex-wrap justify-between gap-4 mb-6">
                <h1 className="text-3xl varela-round">
                    Employees
                </h1>
                <div className="flex justify-end gap-3">
                    { canRead ? (
                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={handleExport}
                        >
                            <Download size="1.5rem"/> Export
                        </Button>
                    ) : (<></>) }
                    { canCreate ? (
                        <Button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={handleCreate}
                        >
                            <Plus size="1.5rem"/> Create
                        </Button>
                    ) : (<></>) }
                </div>
            </header>
            <EmployeeFilter/>
            <EmployeeTable/>
            <LoadingModal
                open={loading}
            />
        </section>
    )
}