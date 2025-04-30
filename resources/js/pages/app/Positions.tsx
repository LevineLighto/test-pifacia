import { AppLayout } from "@/components/layouts";
import { PositionFilterProvider, PositionForm, PositionFormProvider, PositionSection } from "@/hr/components";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const PositionsPage : FC = () => (
    <>
        <Head
            title="Positions"
        />
        <AppLayout>
            <PositionFormProvider>
                <PositionFilterProvider>
                    <PositionSection/>
                    <PositionForm/>
                </PositionFilterProvider>
            </PositionFormProvider>
        </AppLayout>
    </>
)

export default PositionsPage