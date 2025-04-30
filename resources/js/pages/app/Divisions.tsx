import { AppLayout } from "@/components/layouts";
import { DivisionFilterProvider, DivisionForm, DivisionFormProvider, DivisionSection } from "@/hr/components";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const DivisionsPage : FC = () => (
    <>
        <Head
            title="Divisions"
        />
        <AppLayout>
            <DivisionFormProvider>
                <DivisionFilterProvider>
                    <DivisionSection/>
                    <DivisionForm/>
                </DivisionFilterProvider>
            </DivisionFormProvider>
        </AppLayout>
    </>
)

export default DivisionsPage