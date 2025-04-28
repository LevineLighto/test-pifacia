import { Button } from "@/components/buttons";
import { Input, InputChangeHandler } from "@/components/inputs";
import { FC, FormEventHandler, useState } from "react";
import { LoginRequest } from "../../types";
import { Form } from "@/components/forms/components";
import { Login } from "@/auth/functions";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { route } from "ziggy-js";
import { Loader } from "react-feather";

export const LoginForm : FC = () => {
    const [form, setForm] = useState<LoginRequest>({
        email   : '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const { props } = usePage<PageProps>()

    const handleChange : InputChangeHandler = ({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit : FormEventHandler = (event) => {
        if (loading) {
            return
        }

        setLoading(true)

        Login(form, props.csrf_token)
            .then((response) => {
                if (response.status.code != 200) {
                    return
                }

                toast.success('Successfully logged in')

                setTimeout(() => {
                    window.location.href = route('app.dashboard.index')
                }, 1000)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <section>
            <h1 className="text-3xl varela-round">
                Sign In
            </h1>
            <p className="mb-10">
                Sign in to your account to access <span className="text-primary">Employeee App</span>
            </p>
            <Form onSubmit={handleSubmit}>
                <Input
                    required
                    disabled={loading}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="meeree@irimold.web.id"
                    onChange={handleChange}
                />
                <Input
                    required
                    disabled={loading}
                    name="password"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    className="block w-full my-7"
                    disabled={loading}
                >
                    { loading ? (
                        <>
                            <Loader className="inline-block"/>
                            {' '}
                        </>
                    ) : (<></>) }
                    Sign In
                </Button>
            </Form>
        </section>
    )
}