'use client'

import { FC, useContext } from "react";
import { SidebarContext } from "./contexts";
import { SidebarContextType } from "./types";
import { Briefcase, Columns, Home, Shield, User, Users } from "react-feather";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { SidebarItemProps } from "./props";
import { PageProps } from "@/types";
import { SidebarItems } from "./constants";
import { useHasPermission } from "@/hooks/permission";

export const Sidebar : FC = () => {
    const { open } = useContext(SidebarContext) as SidebarContextType

    return (
        <aside
            className={`${
                open ? 'w-[320px] px-6' : 'w-auto px-3'
            } border-r border-r-slate-100 py-4`}
        >
            <section className="text-center mb-5">
                <Link
                    href={route('app.dashboard.index')}
                >
                    <Users
                        className="text-primary inline-block"
                        strokeWidth={1}
                        size={open ? 64 : 36}
                    />
                </Link>
            </section>
            { SidebarItems.map((section, sectionIndex) => (
                <section
                    key={`sidebar-section-${sectionIndex}`}
                    className="mb-3"
                >
                    { section.map((item, index) => (
                        <SidebarItem
                            key={`sidebar-item-${sectionIndex}-${index}`}
                            label={item.label}
                            icon={item.icon}
                            route={item.route}
                            permissions={item.permissions}
                        />
                    )) }
                </section>
            )) }
        </aside>
    )
}

const SidebarItem : FC<SidebarItemProps> = ({
    label,
    icon : Icon,
    route: routeName,
    permissions = []
}) => {
    const { props } = usePage<PageProps>()
    const { open } = useContext(SidebarContext) as SidebarContextType

    const allowed = useHasPermission(permissions)

    if (!allowed) {
        return (
            <></>
        )
    }

    return (
        <Link
            href={route(routeName)}
            className={`${
                "varela-round flex gap-3 items-center py-3"
            } ${
                routeName == props.route ? 'text-primary' : 'text-slate-500 hover:text-primary'
            } ${
                open ? 'justify-start' : 'justify-center'
            }`}
        >
            <Icon size="1.5rem" strokeWidth={1}/>
            { open ? (
                <span>{label}</span>
            ) : (<></>) }
        </Link>
    )
}