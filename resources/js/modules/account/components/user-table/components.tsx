import { FC, useContext, useState } from "react";
import { UserFormContext, UserFormContextType } from "../user-form";
import { UserFilterContext, UserFilterContextType } from "../user-filter";
import { useGetUsers } from "@/account/hooks";
import { User } from "@/account/types";
import { IconButton } from "@/components/buttons";
import { Edit, Trash } from "react-feather";
import { ConfirmModal } from "@/components/modals";
import { DeleteUser } from "@/account/functions/requests";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { useHasPermission } from "@/hooks/permission";
import { USERS_GROUP_DELETE, USERS_GROUP_READ, USERS_GROUP_UPDATE } from "@/constants/permissions";
import { Table } from "@/components/table";

export const UserTable : FC = () => {
    const canRead   = useHasPermission(USERS_GROUP_READ)
    const canUpdate = useHasPermission(USERS_GROUP_UPDATE)
    const canDelete = useHasPermission(USERS_GROUP_DELETE)

    const { 
        setId, setForm,
        setOpen, setOnSuccess,
    } = useContext(UserFormContext) as UserFormContextType

    const {
        committedFilter
    } = useContext(UserFilterContext) as UserFilterContextType

    const { isLoading, error, data, mutate } = useGetUsers(committedFilter)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [deleteName, setDeleteName] = useState('')
    const [deleting, setDeleting] = useState(false)

    const { props } = usePage<PageProps>()

    const handleEdit = (user : User) => {
        setOpen(false)

        setTimeout(() => {
            setId(user.id)
            setForm({
                name      : user.name,
                email     : user.email,
                role_id   : user.role.id
            })
            setOpen(true)

            setOnSuccess(() => mutate)
        }, 300)
    }

    const handleOpenDelete = (user: User) => {
        setOpen(false)
        setDeleteId(user.id)
        setDeleteName(user.name)
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

        DeleteUser(deleteId, props.csrf_token)
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
                        <th className="text-start">Email</th>
                        <th className="text-start">Role</th>
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
                        <tr key={`user-${item.id}`}>
                            <td>{ item.name }</td>
                            <td>{ item.email }</td>
                            <td>{ item.role.name }</td>
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
                                    { item.id != props.user?.id && canDelete ? (
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
                    message={`Are you sure you want to delete ${ deleteName ? deleteName : 'This user' }?`}
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
