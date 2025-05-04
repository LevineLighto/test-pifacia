'use client'

import { FC, useContext, useState } from "react";
import { DivisionFormContext, DivisionFormContextType } from "../division-form";
import { Button } from "@/components/buttons";
import { Download, Plus, Upload } from "react-feather";
import { DivisionFilter, DivisionFilterContext, DivisionFilterContextType } from "../division-filter";
import { useGetDivisions } from "@/hr/hooks";
import { DivisionTable } from "../division-table/components";
import { useHasPermission } from "@/hooks/permission";
import { DIVISIONS_GROUP_CREATE, DIVISIONS_GROUP_READ } from "@/constants/permissions";
import { ExportDivision } from "@/hr/functions/requests";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { LoadingModal } from "@/components/modals";
import { DivisionImport } from "../division-import";

export const DivisionSection : FC = () => {
    const canCreate = useHasPermission(DIVISIONS_GROUP_CREATE)
    const canRead   = useHasPermission(DIVISIONS_GROUP_READ)

    const [importOpen, setImportOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const {props} = usePage<PageProps>()

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

    const handleImport = () => {
        setImportOpen(true)
    }

    const handleImportClose = () => {
        setImportOpen(false)
    }

    const handleExport = () => {
        if (loading) {
            return
        }
        
        setLoading(true)

        ExportDivision(props.csrf_token)
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
                    Divisions
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
                        <>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex items-center gap-1"
                                onClick={handleImport}
                            >
                                <Upload size="1.5rem"/> Import
                            </Button>
                            <Button
                                type="button"
                                className="flex items-center gap-1"
                                onClick={handleCreate}
                            >
                                <Plus size="1.5rem"/> Create
                            </Button>
                        </>
                    ) : (<></>) }
                </div>
            </header>
            <DivisionFilter/>
            <DivisionTable/>
            <DivisionImport
                open={importOpen}
                onClose={handleImportClose}
            />
            <LoadingModal
                open={loading}
            />
        </section>
    )
}