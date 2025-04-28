'use client'

import { FC, useContext } from "react";
import { SidebarContext } from "./contexts";
import { SidebarContextType } from "./types";
import { Briefcase, Columns, Home, Shield, User, Users } from "react-feather";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { SidebarItemProps } from "./props";
import { PageProps } from "@/types";

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
            <section className="mb-3">
                <SidebarItem
                    label="Dashboard"
                    icon={Home}
                    route="app.dashboard.index"
                />
            </section>
            <section className="mb-3">
                <SidebarItem
                    label="Users"
                    icon={User}
                    route="app.dashboard.index"
                />
                <SidebarItem
                    label="Roles"
                    icon={Shield}
                    route="app.dashboard.index"
                />
            </section>
            <section className="mb-3">
                <SidebarItem
                    label="Employees"
                    icon={Users}
                    route="app.dashboard.index"
                />
                <SidebarItem
                    label="Position"
                    icon={Briefcase}
                    route="app.dashboard.index"
                />
                <SidebarItem
                    label="Divisions"
                    icon={Columns}
                    route="app.dashboard.index"
                />
            </section>
        </aside>
    )
}

const SidebarItem : FC<SidebarItemProps> = ({
    label,
    icon : Icon,
    route: routeName
}) => {
    const { props } = usePage<PageProps>()
    const { open } = useContext(SidebarContext) as SidebarContextType

    return (
        <Link
            href={route(routeName)}
            className={`${
                "flex gap-2 items-center py-3"
            } ${
                routeName = props.route ? 'text-primary' : 'text-slate-500 hover:text-primary'
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