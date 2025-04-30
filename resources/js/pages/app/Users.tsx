import { UserForm, UserFormProvider, UserSection } from "@/account/components";
import { UserFilterProvider } from "@/account/components/user-filter";
import { AppLayout } from "@/components/layouts";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const UsersPage : FC = () => (
    <>
        <Head
            title="Users"
        />
        <AppLayout>
            <UserFormProvider>
                <UserFilterProvider>
                    <UserSection/>
                    <UserForm/>
                </UserFilterProvider>
            </UserFormProvider>
        </AppLayout>
    </>
)

export default UsersPage