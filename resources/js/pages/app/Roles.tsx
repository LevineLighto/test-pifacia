import { RoleForm, RoleFormProvider, RoleSection } from "@/account/components";
import { RoleFilterProvider } from "@/account/components/role-filter";
import { AppLayout } from "@/components/layouts";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const RolesPage : FC = () => (
    <>
        <Head
            title="Roles"
        />
        <AppLayout>
            <RoleFormProvider>
                <RoleFilterProvider>
                    <RoleSection/>
                    <RoleForm/>
                </RoleFilterProvider>
            </RoleFormProvider>
        </AppLayout>
    </>
)

export default RolesPage