import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { UserFormContextType } from "./types";
import { UserRequest } from "@/account/types";

export const UserFormContext = createContext<UserFormContextType | null>(null)
export const UserFormProvider : FC<PropsWithChildren> = ({ children }) => {
    const [form, setForm] = useState<UserRequest>({
        name    : '',
        email   : '',
        password: '',
        role_id : ''
    })

    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const [onSuccess, setOnSuccess] = useState<undefined | (() => void)>()

    const reset = useCallback(() => {
        setForm((prevState) => ({
            name    : '',
            email   : '',
            password: '',
            role_id : ''
        }))
    }, [setForm])

    return (
        <UserFormContext
            value={{
                form, setForm, reset,
                open, setOpen,
                id, setId,
                onSuccess, setOnSuccess,
            }}
        >
            { children }
        </UserFormContext>
    )
}