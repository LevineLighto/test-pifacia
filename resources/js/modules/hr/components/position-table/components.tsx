import { FC, useContext, useState } from "react";
import { PositionFormContext, PositionFormContextType } from "../position-form";
import { PositionFilterContext, PositionFilterContextType } from "../position-filter";
import { useGetPositions } from "@/hr/hooks";
import { Position } from "@/hr/types";
import { IconButton } from "@/components/buttons";
import { Edit, Trash } from "react-feather";
import { ConfirmModal } from "@/components/modals";
import { DeletePosition } from "@/hr/functions/requests";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { useHasPermission } from "@/hooks/permission";
import { POSITIONS_GROUP_DELETE, POSITIONS_GROUP_READ, POSITIONS_GROUP_UPDATE } from "@/constants/permissions";
import { Table } from "@/components/table";
import { DataDisplay, StatusBadge } from "@/components/misc";
import { Pagination } from "@/components/navigations";

export const PositionTable : FC = () => {
    const canRead   = useHasPermission(POSITIONS_GROUP_READ)
    const canUpdate = useHasPermission(POSITIONS_GROUP_UPDATE)
    const canDelete = useHasPermission(POSITIONS_GROUP_DELETE)

    const { 
        setId, setForm,
        setOpen, setOnSuccess,
    } = useContext(PositionFormContext) as PositionFormContextType

    const {
        committedFilter, setCommittedFilter
    } = useContext(PositionFilterContext) as PositionFilterContextType

    const { isLoading, error, data, mutate } = useGetPositions(committedFilter)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [deleteName, setDeleteName] = useState('')
    const [deleting, setDeleting] = useState(false)

    const { props } = usePage<PageProps>()
    
    const handlePagination = (page: number) => {
        setCommittedFilter((prevState) => ({
            ...prevState,
            page: page
        }))
    }

    const handleEdit = (position : Position) => {
        setOpen(false)

        setTimeout(() => {
            setId(position.id)
            setForm({
                name        : position.name,
                code        : position.code,
                is_active   : position.is_active,
                scope       : position.scope,
                division_id : position.division.id,
            })
            setOpen(true)

            setOnSuccess(() => mutate)
        }, 300)
    }

    const handleOpenDelete = (position: Position) => {
        setOpen(false)
        setDeleteId(position.id)
        setDeleteName(position.name)
        setDeleteOpen(true)
    }

    const handleCloseDelete = () => {
        setDeleteId('')
        setDeleteName('')
        setDeleteOpen(false)
    }

    const handleDelete = () => {
        if (deleting) {
            return
        }
        
        setDeleting(true)

        DeletePosition(deleteId, props.csrf_token)
            .then(response => {
                if (response.status.code != 200) {
                    return
                }

                toast.success('Data successfully deleted');
                handleCloseDelete()
                mutate()
            })
            .finally(() => {
                setDeleting(false)
            })
    }

    if (!canRead) {
        return (<></>)
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th className="text-start">Name</th>
                        <th className="text-start">Scopes</th>
                        <th className="text-start">History</th>
                        <th className="text-end"/>
                    </tr>
                </thead>
                <tbody>
                    { isLoading ? (
                        <tr>
                            <td colSpan={4} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={4} className="text-center text-primary">
                                Unable to get data
                            </td>
                        </tr>
                    ) : !data?.data?.length ? (
                        <tr>
                            <td colSpan={4} className="text-center">
                                Data not found
                            </td>
                        </tr>
                    ) : data.data.map((item) => (
                        <tr key={`position-${item.id}`}>
                            <td>
                                <p className="font-medium mb-2">
                                    { item.name }
                                </p>
                                <DataDisplay
                                    label="Code"
                                    containerClassName="mb-3"
                                >
                                    { item.code }
                                </DataDisplay>
                                <DataDisplay
                                    label="Division"
                                    containerClassName="mb-3"
                                >
                                    { item.division.name }
                                </DataDisplay>
                                <DataDisplay
                                    label="Status"
                                    containerClassName="mb-3"
                                >
                                    <StatusBadge
                                        active={item.is_active}
                                    />
                                </DataDisplay>
                            </td>
                            <td>
                                <ul>
                                    { item.scope.map((scope, index) => (
                                        <li
                                            key={`scope-${item.id}-${index}`}
                                            className="mb-3"
                                        >
                                            { scope }
                                        </li>
                                    )) }
                                </ul>
                            </td>
                            <td>
                                <DataDisplay
                                    label="Created At"
                                    containerClassName="mb-2"
                                >
                                    { item.created_at }
                                </DataDisplay>
                                <DataDisplay
                                    label="Created By"
                                    containerClassName="mb-3"
                                >
                                    { item.created_by?.name }
                                </DataDisplay>
                                { item.updated_by?.name ? (
                                    <>
                                        <DataDisplay
                                            label="Last Updated At"
                                            containerClassName="mb-2"
                                        >
                                            { item.updated_at }
                                        </DataDisplay>
                                        <DataDisplay
                                            label="Last Updated By"
                                            containerClassName="mb-3"
                                        >
                                            { item.updated_by?.name }
                                        </DataDisplay>
                                    </>
                                ) : (<></>) }
                            </td>
                            <td>
                                <div className="flex gap-2 justify-end">
                                    { canUpdate ? (
                                        <IconButton
                                            onClick={() => handleEdit(item)}
                                            variant="outline"
                                        >
                                            <Edit
                                                size="1rem"
                                            />
                                        </IconButton>
                                    ) : (<></>) }
                                    { canDelete ? (
                                        <IconButton
                                            onClick={() => handleOpenDelete(item)}
                                        >
                                            <Trash
                                                size="1rem"
                                            />
                                        </IconButton>
                                    ) : (<></>) }
                                </div>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </Table>
            <Pagination
                page={data?.pagination?.current_page}
                max={data?.pagination?.total_page}
                onClick={handlePagination}
            />
            { canDelete ? (
                <ConfirmModal
                    message={`Are you sure you want to delete ${ deleteName ? deleteName : 'This position' }?`}
                    flow="negative"
                    open={deleteOpen}
                    loading={deleting}
                    onCancel={handleCloseDelete}
                    onSubmit={handleDelete}
                />
            ) : (<></>) }
        </>
    )
}
