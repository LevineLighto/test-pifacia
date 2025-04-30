import { AppLayout } from "@/components/layouts";
import { ActivityFilterProvider, ActivitySection } from "@/misc/components";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const ActivityPage : FC = () => (
    <>
        <Head
            title="Activity"
        />
        <AppLayout>
            <ActivityFilterProvider>
                <ActivitySection/>
            </ActivityFilterProvider>
        </AppLayout>
    </>
)

export default ActivityPage