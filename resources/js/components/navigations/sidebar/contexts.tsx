'use client'

import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { SidebarContextType } from "./types";

export const SidebarContext = createContext<SidebarContextType|null>(null)
export const SidebarProvider : FC<PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(false)

    const toggle = useCallback(() => {
        setOpen((prevState) => !prevState)
    }, [setOpen])

    return (
        <SidebarContext 
            value={{
                open, toggle
            }}
        >
            { children }
        </SidebarContext>
    )
}