'use client'

import { LogoutBtn } from "@/auth/components/logout-btn";
import { UserPicture } from "@/components/misc";
import { FC, MouseEventHandler, useCallback, useContext, useEffect, useState } from "react";
import { Menu } from "react-feather";
import { SidebarContext, SidebarContextType } from "../sidebar";

export const Navbar : FC = () => {
    const [open, setOpen] = useState(false)
    const { toggle : sidebarToggle } = useContext(SidebarContext) as SidebarContextType

    const handleToggle = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        event.preventDefault()
        event.stopPropagation()
        setOpen((prevState) => !prevState)
    }, [setOpen])

    useEffect(() => {
        const closeLogout = () => { setOpen(false) }

        document.addEventListener('click', closeLogout)

        return () => {
            document.removeEventListener('click', closeLogout)
        }
    }, [])

    return (
        <nav className="relative flex justify-between items-center bg-white px-6 py-3 border-b border-b-slate-100 z-1000">
            <Menu
                className="cursor-pointer"
                onClick={sidebarToggle}
            />
            <UserPicture
                className="cursor-pointer"
                onClick={handleToggle}
            />
            <LogoutBtn
                className={`${
                    open ? 'block' : 'hidden'
                } absolute bottom-0 right-0 translate-y-full -translate-x-6`}
            />
        </nav>
    )
    
}