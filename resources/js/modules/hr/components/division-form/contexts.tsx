import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { DivisionFormContextType } from "./types";
import { DivisionRequest } from "@/hr/types";

export const DivisionFormContext = createContext<DivisionFormContextType | null>(null)
export const DivisionFormProvider : FC<PropsWithChildren> = ({ children }) => {
    const [form, setForm] = useState<DivisionRequest>({
        name        : '',
        code        : '',
        scope       : [],
        is_active   : true,
    })

    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const [onSuccess, setOnSuccess] = useState<undefined | (() => void)>()

    const reset = useCallback(() => {
        setForm((prevState) => ({
            name        : '',
            code        : '',
            scope       : [],
            is_active   : true,
        }))
    }, [setForm])

    return (
        <DivisionFormContext
            value={{
                form, setForm, reset,
                open, setOpen,
                id, setId,
                onSuccess, setOnSuccess,
            }}
        >
            { children }
        </DivisionFormContext>
    )
}