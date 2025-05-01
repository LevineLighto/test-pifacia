import { DropboxProvider } from "@/components/inputs";
import { AppLayout } from "@/components/layouts";
import { EmployeeFilterProvider } from "@/hr/components/employee-filter";
import { EmployeeForm, EmployeeFormProvider } from "@/hr/components/employee-form";
import { EmployeeSection } from "@/hr/components/employee-section";
import { Head } from "@inertiajs/react";
import { FC } from "react";

const EmployeesPage : FC = () => (
    <>
        <Head
            title="Employees"
        />
        <AppLayout>
            <DropboxProvider>
                <EmployeeFormProvider>
                    <EmployeeFilterProvider>
                        <EmployeeSection/>
                        <EmployeeForm/>
                    </EmployeeFilterProvider>
                </EmployeeFormProvider>
            </DropboxProvider>
        </AppLayout>
    </>
)

export default EmployeesPage