import { Navbar, Sidebar, SidebarProvider } from "@/components/navigations";
import { FC, PropsWithChildren } from "react";

export const AppLayout : FC<PropsWithChildren> = ({ children }) => (
    <SidebarProvider>
        <div className="flex w-full">
            <Sidebar/>
            <section className="grow">
                <Navbar/>
                <main className="p-5">
                    { children }
                </main>
            </section>
        </div>
    </SidebarProvider>
)