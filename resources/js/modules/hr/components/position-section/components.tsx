'use client'

import { FC, useContext, useState } from "react";
import { PositionFormContext, PositionFormContextType } from "../position-form";
import { Button } from "@/components/buttons";
import { Download, Plus } from "react-feather";
import { PositionFilter, PositionFilterContext, PositionFilterContextType } from "../position-filter";
import { useGetPositions } from "@/hr/hooks";
import { PositionTable } from "../position-table/components";
import { useHasPermission } from "@/hooks/permission";
import { POSITIONS_GROUP_CREATE, POSITIONS_GROUP_READ } from "@/constants/permissions";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ExportPosition } from "@/hr/functions/requests";
import { toast } from "react-toastify";
import { LoadingModal } from "@/components/modals";

export const PositionSection : FC = () => {
    const canCreate = useHasPermission(POSITIONS_GROUP_CREATE)
    const canRead   = useHasPermission(POSITIONS_GROUP_READ)

    const [loading, setLoading] = useState(false)
    const {props} = usePage<PageProps>()

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

    const handleExport = () => {
        if (loading) {
            return
        }
        
        setLoading(true)

        ExportPosition(props.csrf_token)
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
                    Positions
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
            <PositionFilter/>
            <PositionTable/>
            <LoadingModal
                open={loading}
            />
        </section>
    )
}