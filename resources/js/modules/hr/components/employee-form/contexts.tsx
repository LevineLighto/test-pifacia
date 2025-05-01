import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import { EmployeeFormContextType } from "./types";
import { EmployeeRequest } from "@/hr/types";
import { DropboxContext, DropboxContextType } from "@/components/inputs";

export const EmployeeFormContext = createContext<EmployeeFormContextType | null>(null)
export const EmployeeFormProvider : FC<PropsWithChildren> = ({ children }) => {
    const [form, setForm] = useState<EmployeeRequest>({
        name        : '',
        email       : '',
        password    : '',
        joined_at   : new Date,
        is_active   : true,
        bpjs        : {},
        bpjs_file   : [],
    })

    const { reset : dropboxReset } = useContext(DropboxContext) as DropboxContextType

    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const [onSuccess, setOnSuccess] = useState<undefined | (() => void)>()

    const reset = useCallback(() => {
        setForm((prevState) => ({
            name        : '',
            email       : '',
            password    : '',
            joined_at   : new Date,
            is_active   : true,
            bpjs        : {},
            bpjs_file   : [],
        }))

        dropboxReset('employee-form')
    }, [setForm])

    return (
        <EmployeeFormContext
            value={{
                form, setForm, reset,
                open, setOpen,
                id, setId,
                onSuccess, setOnSuccess,
            }}
        >
            { children }
        </EmployeeFormContext>
    )
}