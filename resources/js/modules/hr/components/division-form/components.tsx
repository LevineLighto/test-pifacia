'use client'

import { FC, useCallback, useContext, useEffect, useState } from "react";
import { DivisionFormContext } from "./contexts";
import { DivisionFormContextType } from "./types";
import { Offcanvas } from "@/components/offcanvas";
import { Form } from "@/components/forms";
import { Checkbox, Input, InputChangeHandler } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { CreateDivision, UpdateDivision } from "@/hr/functions/requests";
import { Response } from "@/functions/fetch";
import { Division } from "@/hr/types";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useHasPermission } from "@/hooks/permission";
import { ROLES_GROUP_CREATE, ROLES_GROUP_UPDATE } from "@/constants/permissions";
import { ScopeInput } from "../scope-input";

export const DivisionForm : FC = () => {
    const canCreate = useHasPermission(ROLES_GROUP_CREATE)
    const canUpdate = useHasPermission(ROLES_GROUP_UPDATE)

    const {
        id, setId,
        open, setOpen,
        form, setForm, reset,
        onSuccess, setOnSuccess,
    } = useContext(DivisionFormContext) as DivisionFormContextType

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
            service = UpdateDivision(id, form, props.csrf_token)
        } else {
            service = CreateDivision(form, props.csrf_token)
        }

        service.then((response: Response<Division>) => {
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

    if (!canCreate && !canUpdate) {
        return (<></>)
    }

    return (
        <Offcanvas
            open={open}
            title={(
                <h3 className="varela-round text-2xl">
                    { id ? 'Edit Division' : 'Create Division' }
                </h3>
            )}
            onClose={handleClose}
        >
            <Form
                onSubmit={handleSubmit}
                className="flex gap-4 h-full flex-col justify-between"
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
                        type="code"
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
                    <ScopeInput
                        name="scope"
                        label="Scopes"
                        value={form.scope}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </section>
                <section className="sticky bottom-0 p-3 bg-white">
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
                </section>
            </Form>
        </Offcanvas>
    )
}