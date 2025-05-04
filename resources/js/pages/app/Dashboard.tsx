import { AppLayout } from "@/components/layouts";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const DashboardPage : FC = () => (
    <>
        <Head
            title="Dashboard"
        />
        <AppLayout>
            I am DASHBOARD!
        </AppLayout>
    </>
)

export default DashboardPage