import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PermissionFormContext } from "./contexts";
import { PermissionFormContextType } from "./types";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Checkbox, InputChangeHandler } from "@/components/inputs";
import { AssignPermissionRequest } from "@/account/types";
import { AssignPermission } from "@/account/functions/requests";
import { toast } from "react-toastify";
import { Offcanvas } from "@/components/offcanvas";
import { Form } from "@/components/forms";
import { Table } from "@/components/table";
import { AssignPermissionFormItem } from "@/account/types/requests";
import { toTitleCase } from "@/functions/formatter";
import { Button } from "@/components/buttons";
import { Loader } from "react-feather";
import { useHasPermission } from "@/hooks/permission";
import { PERMISSION_ASSIGN } from "@/constants/permissions";

export const PermissionForm : FC = () => {
    const canAssign = useHasPermission(PERMISSION_ASSIGN)
    
    const {
        id, setId,
        open, setOpen,
        form, setForm, reset,
        onSuccess, setOnSuccess,
    } = useContext(PermissionFormContext) as PermissionFormContextType

    const { props } = usePage<PageProps>()

    const [loading, setLoading] = useState(false)

    const grouped = useMemo(() => {
        const grouped : {group: string, permissions: AssignPermissionFormItem[]}[] = []

        for (const code in form) {
            if (!Object.prototype.hasOwnProperty.call(form, code)) {
                continue
            }

            const permission = form[code]

            const [group, action] = code.split('.')
            const index = grouped.findIndex((item) => ( item.group == group ))
            if (index < 0) {
                grouped.push({
                    group       : group,
                    permissions : [
                        permission
                    ]
                })
                continue
            }

            grouped[index].permissions.push(permission)
        }

        return grouped
    }, [form])

    const handleChange = useCallback<InputChangeHandler>(({name, value}) => {
        setForm((prevState) => {
            const modified = { ...prevState }

            const [group, action] = name.split('.')
            if (action != '*') {
                modified[name] = {
                    ...modified[name],
                    checked: value
                }
                return modified
            }

            for (const key in modified) {
                if (!key.startsWith(`${group}.`)) {
                    continue;
                }
                if (!Object.prototype.hasOwnProperty.call(modified, key)) {
                    continue;
                }

                modified[key] = {
                    ...modified[key],
                    checked : value,
                    disabled: value && !key.endsWith('*')
                }
            }

            return modified
        })
    }, [])

    const handleClose = useCallback(() => {
        
        setId((prevState) => '')
        setOpen((prevState) => false)
        setOnSuccess((prevState) => undefined)
        reset()

    }, [])

    const handleSubmit = () => {
        if (loading) {
            return
        }

        setLoading(true)

        const request : AssignPermissionRequest = {
            permission_ids: []
        }

        for (const key in form) {
            if (!Object.prototype.hasOwnProperty.call(form, key)) {
                continue
            }

            const item = form[key]

            if (item.checked) {
                request.permission_ids.push(item.id)
            }
        }

        AssignPermission(id, request, props.csrf_token)
            .then((response) => {
                if (response.status.code != 200) {
                    return
                }

                toast.success('Data successfully saved')

                if (typeof onSuccess == 'function') {
                    onSuccess()
                }
    
                handleClose()
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (open) {
            return
        }

        handleClose()
    }, [open])

    if (!canAssign) {
        return <></>
    }

    return (
        <Offcanvas
            open={open}
            title={(
                <h3 className="varela-round text-2xl">
                    Assign Permissions
                </h3>
            )}
            onClose={handleClose}
        >
            <Form
                onSubmit={handleSubmit}
                className="flex gap-4 flex-col justify-between"
            >
                <Table>
                    <thead>
                        <tr>
                            <th className="text-start">Group</th>
                            <th className="text-start">Permission</th>
                        </tr>
                    </thead>
                    <tbody>
                        { grouped.map((group) => (
                            <tr key={`perm-group-${group.group}`}>
                                <td
                                    className="font-medium"
                                >
                                    { toTitleCase(group.group) }
                                </td>
                                <td>
                                    <div 
                                        className="flex flex-wrap gap-4"
                                    >
                                        { group.permissions.map((permission) => (
                                            <Checkbox
                                                key={`perm-${permission.id}`}
                                                name={permission.code}
                                                label={permission.name}
                                                checked={permission.checked}
                                                onChange={handleChange}
                                                disabled={permission.disabled || loading}
                                            />
                                        )) }
                                    </div>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </Table>
                <section className="sticky bottom-0 p-3 bg-white">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        { loading ? (
                            <>
                                <Loader className="inline-block"/>
                                {' '}
                            </>
                        ) : <></> }
                        Submit
                    </Button>
                </section>
            </Form>
        </Offcanvas>
    )
}
