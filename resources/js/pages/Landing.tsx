import { LoginForm } from "@/auth/components/login-form";
import { base_url } from "@/functions/url";
import { Head } from "@inertiajs/react";
import { FC } from "react";
import { Users } from "react-feather";

const LandingPage : FC = () => (
    <>
        <Head
            title="Login"
        />
        <main className="grid lg:grid-cols-2 h-screen">
            <aside className="hidden lg:block px-8 py-5">
                <div className="rounded-2xl overflow-hidden relative h-full">
                    <img
                        src={base_url('images/landing.webp')}
                        className="object-cover w-full h-full"
                        alt="Landing backdrop"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-slate-900/0 via-50% via-slate-900/0 to-slate-800/75"/>
                </div>
            </aside>
            <section className="max-w-[96vh] margin-x-auto px-8 py-5 flex flex-col justify-between h-full">
                <header className="text-primary text-center">
                    <Users 
                        size="6.5rem" 
                        strokeWidth={1}
                        className="inline-block"
                    />
                    <h1 className="text-2xl varela-round">
                        Employeee
                    </h1>
                </header>
                <LoginForm/>
                <footer className="border-t border-t-slate-200 py-3 flex justify-between text-sm text-slate-400">
                    Copyright &copy; { new Date().getFullYear() } Meeree
                </footer>
            </section>
        </main>
    </>
)

export default LandingPage