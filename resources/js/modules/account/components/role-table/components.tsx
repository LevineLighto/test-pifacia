import { FC, useContext, useState } from "react";
import { RoleFormContext, RoleFormContextType } from "../role-form";
import { RoleFilterContext, RoleFilterContextType } from "../role-filter";
import { useGetRoles } from "@/account/hooks";
import { DataDisplay, StatusBadge } from "@/components/misc";
import { Card } from "@/components/card";
import { Role } from "@/account/types";
import { IconButton } from "@/components/buttons";
import { Edit, Shield, Trash } from "react-feather";
import { ConfirmModal } from "@/components/modals";
import { DeleteRole } from "@/account/functions/requests";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { PermissionFormContext, PermissionFormContextType } from "../permission-form";
import { useHasPermission } from "@/hooks/permission";
import { PERMISSION_ASSIGN, ROLES_GROUP_DELETE, ROLES_GROUP_READ, ROLES_GROUP_UPDATE } from "@/constants/permissions";

export const RoleTable : FC = () => {
    const canRead   = useHasPermission(ROLES_GROUP_READ)
    const canUpdate = useHasPermission(ROLES_GROUP_UPDATE)
    const canDelete = useHasPermission(ROLES_GROUP_DELETE)
    const canAssign = useHasPermission(PERMISSION_ASSIGN)

    const { 
        setId, setForm,
        setOpen, setOnSuccess,
    } = useContext(RoleFormContext) as RoleFormContextType
    
    const { 
        setId       : setPermissionId,
        setOpen     : setPermissionOpen, 
    } = useContext(PermissionFormContext) as PermissionFormContextType

    const {
        committedFilter
    } = useContext(RoleFilterContext) as RoleFilterContextType

    const { isLoading, error, data, mutate } = useGetRoles(committedFilter)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [deleteName, setDeleteName] = useState('')
    const [deleting, setDeleting] = useState(false)

    const { props } = usePage<PageProps>()

    const handleEdit = (role : Role) => {
        if (!role.editable || role.id == props.user?.role?.id) {
            return
        }

        setOpen(false)
        setPermissionOpen(false)

        setTimeout(() => {
            setId(role.id)
            setForm({
                name        : role.name,
                code        : role.code,
                is_active   : role.is_active
            })
            setOpen(true)

            setOnSuccess(() => mutate)
        }, 300)
    }

    const handleOpenDelete = (role: Role) => {
        setOpen(false)
        setPermissionOpen(false)
        setDeleteId(role.id)
        setDeleteName(role.name)
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

        DeleteRole(deleteId, props.csrf_token)
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

    const handleAssignPermission = (role: Role) => {
        if (props.user?.role.code != 'SU' && (role.id == props.user?.role?.id || role.code == 'SU')) {
            return
        }

        setOpen(false)
        setPermissionOpen(false)
        setTimeout(() => {
            setPermissionId(role.id)
            setPermissionOpen(true)
        }, 300)
    }

    if (!canRead) {
        return (<></>)
    }

    return (
        <>
            <section 
                className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4"
            >
                { isLoading ? (
                    <Card
                        className="text-center md:col-span-2 lg:col-span-4 2xl:col-span-6"
                    >
                        Loading...
                    </Card>
                ) : error ? (
                    <Card
                        className="text-center text-primary md:col-span-2 lg:col-span-4 2xl:col-span-6"
                    >
                        Unable to get data
                    </Card>
                ) : !data?.data?.length ? (
                    <Card
                        className="text-center md:col-span-2 lg:col-span-4 2xl:col-span-6"
                    >
                        Data not found
                    </Card>
                ) : data.data.map((item) => (
                    <Card key={`role-${item.id}`}>
                        <p className="font-medium mb-3">{ item.name }</p>
                        <div className="grid grid-cols-2 mb-3">
                            <DataDisplay
                                label="Code"
                            >
                                { item.code }
                            </DataDisplay>
                            <DataDisplay
                                label="Status"
                                containerClassName="text-right"
                            >
                                <StatusBadge
                                    active={item.is_active}
                                />
                            </DataDisplay>
                        </div>

                        { item.id != props.user?.role?.id || props.user.role.code == 'SU' ? (
                            <div className="flex gap-2 justify-end">
                                { item.editable && canUpdate ? (
                                    <IconButton
                                        onClick={() => handleEdit(item)}
                                        variant="outline"
                                    >
                                        <Edit
                                            size="1rem"
                                        />
                                    </IconButton>
                                ) : (<></>) }
                                { canAssign ? (
                                    <IconButton
                                        onClick={() => handleAssignPermission(item)}
                                        variant="outline"
                                    >
                                        <Shield
                                            size="1rem"
                                        />
                                    </IconButton>
                                ) : (<></>) }
                                { item.editable && canDelete ? (
                                    <IconButton
                                        onClick={() => handleOpenDelete(item)}
                                    >
                                        <Trash
                                            size="1rem"
                                        />
                                    </IconButton>
                                ) : (<></>) }
                            </div>
                        ) : (<></>) }
                    </Card>
                )) }
            </section>
            { canDelete ? (
                <ConfirmModal
                    message={`Are you sure you want to delete ${ deleteName ? deleteName : 'This role' }?`}
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
