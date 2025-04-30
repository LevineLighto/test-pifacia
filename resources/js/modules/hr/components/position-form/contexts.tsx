import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { PositionFormContextType } from "./types";
import { PositionRequest } from "@/hr/types";

export const PositionFormContext = createContext<PositionFormContextType | null>(null)
export const PositionFormProvider : FC<PropsWithChildren> = ({ children }) => {
    const [form, setForm] = useState<PositionRequest>({
        name        : '',
        code        : '',
        scope       : [],
        division_id : '',
        is_active   : true,
    })

    const [id, setId] = useState('')
    const [open, setOpen] = useState(false)
    const [onSuccess, setOnSuccess] = useState<undefined | (() => void)>()

    const reset = useCallback(() => {
        setForm((prevState) => ({
            name        : '',
            code        : '',
            division_id : '',
            scope       : [],
            is_active   : true,
        }))
    }, [setForm])

    return (
        <PositionFormContext
            value={{
                form, setForm, reset,
                open, setOpen,
                id, setId,
                onSuccess, setOnSuccess,
            }}
        >
            { children }
        </PositionFormContext>
    )
}