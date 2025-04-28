import { FC, MouseEventHandler, useState } from "react";
import { LogoutBtnProps } from "./props";
import { Loader, LogOut } from "react-feather";
import { Logout } from "@/auth/functions";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { route } from "ziggy-js";
import { buttonClasses } from "./classes";

export const LogoutBtn : FC<LogoutBtnProps> = ({ 
    className = ''
}) => {
    const [loading, setLoading] = useState(false)

    const { props } = usePage<PageProps>()

    const handleLogout : MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        event.preventDefault()
        if (loading) {
            return
        }

        setLoading(true)

        Logout(props.csrf_token)
            .then(response => {
                if (response.status.code != 200) {
                    return
                }

                toast.success('Successfully logged out')

                setTimeout(() => {
                    window.location.href = route('index')
                }, 1000)
            })
    }

    return (
        <button
            className={`${
                buttonClasses.background
            } ${
                buttonClasses.border
            } ${
                buttonClasses.borderRadius
            } ${
                buttonClasses.color
            } ${
                buttonClasses.cursor
            } ${
                buttonClasses.display
            } ${
                buttonClasses.flex
            } ${
                buttonClasses.gap
            } ${
                buttonClasses.padding
            } ${
                className
            }`}
            onClick={handleLogout}
        >
            { loading ? (
                <Loader size="1rem"/>
            ) : (
                <LogOut size="1rem"/>
            ) }
            <span>Logout</span>
        </button>
    )
}