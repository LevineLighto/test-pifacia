import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { PermissionFormContextType } from "./types";
import { useFindRole, useGetPermission } from "@/account/hooks";
import { AssignPermissionForm, AssignPermissionFormItem } from "@/account/types/requests";

export const PermissionFormContext = createContext<PermissionFormContextType | null>(null)
export const PermissionFormProvider : FC<PropsWithChildren> = ({
    children
}) => {
    const [form, setForm] = useState<AssignPermissionForm>({})

    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const [onSuccess, setOnSuccess] = useState<undefined | (() => void)>()

    const { data: permissions, isLoading: permissionsLoading } = useGetPermission()
    const { data: role, isLoading: roleLoading } = useFindRole(id)

    const reset = useCallback(() => {
        setForm((prevState) => ({}))
    }, [setForm])

    useEffect(() => {
        if (permissionsLoading || roleLoading) {
            return
        }

        setForm((prevState) => {
            const parsed = {}
            permissions?.data?.forEach((permission) => {
                const parsedItem : AssignPermissionFormItem = {
                    id      : permission.id,
                    name    : permission.name,
                    code    : permission.code,
                    checked : false,
                    disabled: false
                }

                if (role?.data?.permissions?.length) {
                    parsedItem.checked = role.data.permissions.findIndex((perm) => perm.id == permission.id) != -1
                }

                parsed[permission.code] = parsedItem
            })

            return parsed
        })

    }, [permissions, permissionsLoading, role, roleLoading])

    return (
        <PermissionFormContext
            value={{
                id, setId,
                form, setForm, reset,
                open, setOpen,
                onSuccess, setOnSuccess
            }}
        >
            { children }
        </PermissionFormContext>
    )
}