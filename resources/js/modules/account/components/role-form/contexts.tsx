'use client'

import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { RoleFormContextType } from "./types";
import { RoleRequest } from "@/account/types";

export const RoleFormContext = createContext<RoleFormContextType | null>(null)
export const RoleFormProvider : FC<PropsWithChildren> = ({ children }) => {
    const [form, setForm] = useState<RoleRequest>({
        name        : '',
        code        : '',
        is_active   : true
    })

    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const [onSuccess, setOnSuccess] = useState<undefined | (() => void)>()

    const reset = useCallback(() => {
        setForm((prevState) => ({
            name        : '',
            code        : '',
            is_active   : true
        }))
    }, [setForm])

    return (
        <RoleFormContext
            value={{
                form, setForm, reset,
                open, setOpen,
                id, setId,
                onSuccess, setOnSuccess,
            }}
        >
            { children }
        </RoleFormContext>
    )
}