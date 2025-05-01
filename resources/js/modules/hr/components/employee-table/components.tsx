import { FC, useContext, useState } from "react";
import { EmployeeFormContext, EmployeeFormContextType } from "../employee-form";
import { EmployeeFilterContext, EmployeeFilterContextType } from "../employee-filter";
import { useGetEmployees } from "@/hr/hooks";
import { Employee } from "@/hr/types";
import { IconButton } from "@/components/buttons";
import { Edit, File, Trash } from "react-feather";
import { ConfirmModal } from "@/components/modals";
import { DeleteEmployee } from "@/hr/functions/requests";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { useHasPermission } from "@/hooks/permission";
import { EMPLOYEES_GROUP_DELETE, EMPLOYEES_GROUP_READ, EMPLOYEES_GROUP_UPDATE } from "@/constants/permissions";
import { Table } from "@/components/table";
import { DataDisplay, StatusBadge } from "@/components/misc";

export const EmployeeTable : FC = () => {
    const canRead   = useHasPermission(EMPLOYEES_GROUP_READ)
    const canUpdate = useHasPermission(EMPLOYEES_GROUP_UPDATE)
    const canDelete = useHasPermission(EMPLOYEES_GROUP_DELETE)

    const { 
        setId, setForm,
        setOpen, setOnSuccess,
    } = useContext(EmployeeFormContext) as EmployeeFormContextType

    const {
        committedFilter
    } = useContext(EmployeeFilterContext) as EmployeeFilterContextType

    const { isLoading, error, data, mutate } = useGetEmployees(committedFilter)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [deleteName, setDeleteName] = useState('')
    const [deleting, setDeleting] = useState(false)

    const { props } = usePage<PageProps>()

    const handleOpenFile = (employee: Employee) => {
        if (employee.bpjs_file) {
            window.open(employee.bpjs_file, '_blank')
        }
    }

    const handleEdit = (employee : Employee) => {
        setOpen(false)

        setTimeout(() => {
            setId(employee.id)
            setForm({
                name        : employee.name,
                email       : employee.email,
                is_active   : employee.is_active,
                bpjs        : employee.bpjs,
                position_id : employee.position.id,
                joined_at   : employee.raw_joined_at,
            })
            setOpen(true)

            setOnSuccess(() => mutate)
        }, 300)
    }

    const handleOpenDelete = (employee: Employee) => {
        setOpen(false)
        setDeleteId(employee.id)
        setDeleteName(employee.name)
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

        DeleteEmployee(deleteId, props.csrf_token)
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
                        <th className="text-start">Position</th>
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
                        <tr key={`employee-${item.id}`}>
                            <td>
                                <p className="font-medium mb-2">
                                    { item.name }
                                </p>
                                <DataDisplay
                                    label="Email"
                                    containerClassName="mb-3"
                                >
                                    { item.email }
                                </DataDisplay>
                                <DataDisplay
                                    label="Status"
                                    containerClassName="mb-3"
                                >
                                    <StatusBadge active={item.is_active}/>
                                </DataDisplay>
                            </td>
                            <td>
                                <p className="font-medium mb-2">
                                    { item.position.name }
                                </p>
                                <DataDisplay
                                    label="Joined At"
                                    containerClassName="mb-3"
                                >
                                    { item.joined_at }
                                </DataDisplay>
                            </td>
                            <td>
                                <DataDisplay
                                    label="Created At"
                                    containerClassName="mb-1"
                                >
                                    { item.updated_at }
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
                                            containerClassName="mb-1"
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
                                    { item.bpjs_file ? (
                                        <IconButton
                                            onClick={() => handleOpenFile(item)}
                                            variant="outline"
                                        >
                                            <File
                                                size="1rem"
                                            />
                                        </IconButton>
                                    ) : (<></>) }
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
            { canDelete ? (
                <ConfirmModal
                    message={`Are you sure you want to delete ${ deleteName ? deleteName : 'This employee' }?`}
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
