'use client'

import { FC, useContext } from "react";
import { UserFormContext, UserFormContextType } from "../user-form";
import { Button } from "@/components/buttons";
import { Plus } from "react-feather";
import { UserFilter, UserFilterContext, UserFilterContextType } from "../user-filter";
import { useGetUsers } from "@/account/hooks";
import { UserTable } from "../user-table/components";
import { useHasPermission } from "@/hooks/permission";
import { USERS_GROUP_CREATE } from "@/constants/permissions";

export const UserSection : FC = () => {
    const canCreate = useHasPermission(USERS_GROUP_CREATE)

    const { 
        setOpen, setOnSuccess
    } = useContext(UserFormContext) as UserFormContextType

    const {
        committedFilter
    } = useContext(UserFilterContext) as UserFilterContextType

    const { mutate } = useGetUsers(committedFilter)

    const handleCreate = () => {
        setOpen(true)
        setOnSuccess(() => mutate)
    }

    return (
        <section>
            <header className="flex flex-wrap justify-between gap-4 mb-6">
                <h1 className="text-3xl varela-round">
                    Users
                </h1>
                { canCreate ? (
                    <Button
                        type="button"
                        className="flex items-center"
                        onClick={handleCreate}
                    >
                        <Plus size="1.5rem"/> Create
                    </Button>
                ) : (<></>) }
            </header>
            <UserFilter/>
            <UserTable/>
        </section>
    )
}