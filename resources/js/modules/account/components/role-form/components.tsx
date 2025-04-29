'use client'

import { FC, useCallback, useContext, useEffect, useState } from "react";
import { RoleFormContext } from "./contexts";
import { RoleFormContextType } from "./types";
import { Offcanvas } from "@/components/offcanvas";
import { Form } from "@/components/forms";
import { Checkbox, Input, InputChangeHandler } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { CreateRole, UpdateRole } from "@/account/functions/requests";
import { Response } from "@/functions/fetch";
import { Role } from "@/account/types";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export const RoleForm : FC = () => {
    const {
        id, setId,
        open, setOpen,
        form, setForm, reset,
        onSuccess, setOnSuccess,
    } = useContext(RoleFormContext) as RoleFormContextType

    const { props } = usePage<PageProps>()

    const [loading, setLoading] = useState(false)

    const handleChange = useCallback<InputChangeHandler>(({name, value}) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }, [])

    const handleClose = useCallback(() => {

        setId((prevState) => '')
        setOpen((prevState) => false)
        setOnSuccess((prevState) => undefined)
        reset()

    }, [])

    const handleSubmit = () => {
        if (loading) {
            return
        }

        setLoading(true)

        let service
        if (id) {
            service = UpdateRole(id, form, props.csrf_token)
        } else {
            service = CreateRole(form, props.csrf_token)
        }

        service.then((response: Response<Role>) => {
            if (response.status.code != 200) {
                return
            }

            toast.success('Data successfully saved')

            if (typeof onSuccess == 'function') {
                onSuccess()
            }

            handleClose()
        })
        .finally(() => {
            setLoading(false)
        })
        
    }

    useEffect(() => {
        if (open) {
            return
        }

        handleClose()
    }, [open])

    return (
        <Offcanvas
            open={open}
            title={(
                <h3 className="varela-round text-2xl">
                    { id ? 'Edit Role' : 'Create Role' }
                </h3>
            )}
            onClose={handleClose}
        >
            <Form
                onSubmit={handleSubmit}
                className="flex gap-4 flex-col justify-between"
            >
                <section className="grid gap-4">
                    <Input
                        name="name"
                        label="Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <Input
                        name="code"
                        label="Code"
                        required
                        value={form.code}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <Checkbox
                        name="is_active"
                        label="Is active"
                        checked={form.is_active as boolean}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </section>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    { loading ? (
                        <>
                            <Loader className="inline-block"/>
                            {' '}
                        </>
                    ) : <></> }
                    Submit
                </Button>
            </Form>
        </Offcanvas>
    )
}