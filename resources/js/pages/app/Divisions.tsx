import { DropboxProvider } from "@/components/inputs";
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
            <DropboxProvider>
                <DivisionFormProvider>
                    <DivisionFilterProvider>
                        <DivisionSection/>
                        <DivisionForm/>
                    </DivisionFilterProvider>
                </DivisionFormProvider>
            </DropboxProvider>
        </AppLayout>
    </>
)

export default DivisionsPage