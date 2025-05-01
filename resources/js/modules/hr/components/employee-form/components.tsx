'use client'

import { FC, useCallback, useContext, useEffect, useState } from "react";
import { EmployeeFormContext } from "./contexts";
import { EmployeeFormContextType } from "./types";
import { Offcanvas } from "@/components/offcanvas";
import { Form } from "@/components/forms";
import { Checkbox, Datepicker, Dropbox, Input, InputChangeHandler } from "@/components/inputs";
import { Button } from "@/components/buttons";
import { CreateEmployee, UpdateEmployee } from "@/hr/functions/requests";
import { Response } from "@/functions/fetch";
import { Employee } from "@/hr/types";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useHasPermission } from "@/hooks/permission";
import { ROLES_GROUP_CREATE, ROLES_GROUP_UPDATE } from "@/constants/permissions";
import { PositionSelect } from "../position-select";

export const EmployeeForm : FC = () => {
    const canCreate = useHasPermission(ROLES_GROUP_CREATE)
    const canUpdate = useHasPermission(ROLES_GROUP_UPDATE)

    const {
        id, setId,
        open, setOpen,
        form, setForm, reset,
        onSuccess, setOnSuccess,
    } = useContext(EmployeeFormContext) as EmployeeFormContextType

    const { props } = usePage<PageProps>()

    const [loading, setLoading] = useState(false)

    const handleChange = useCallback<InputChangeHandler>(({name, value}) => {
        setForm((prevState) => {
            
            const modified = { ...prevState }
            const splitted = name.split('.')
            if (splitted.length == 1 ) {
                modified[splitted[0]] = value
            } else {
                modified[splitted[0]][splitted[1]] = value
            }

            return modified

        })
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

        const request = new FormData
        
        for (const name in form) {
            if (!Object.prototype.hasOwnProperty.call(form, name)) {
                continue
            }

            const item = form[name]

            if (Array.isArray(item) && item.length && item[0] instanceof File) {
                request.append(name, item[0])
                continue
            }

            if (item instanceof Date) {
                request.append(name, item.toISOString())
            }

            if (typeof item == 'object') {
                for (const key in item) {
                    if (!Object.prototype.hasOwnProperty.call(item, key)) {
                        continue
                    }

                    request.append(`${name}[${key}]`, item[key])
                }
                continue
            }

            if (typeof item == 'boolean') {
                request.append(name, item ? '1' : '0')
                continue
            }

            request.append(name, item)
        }

        let service
        if (id) {
            service = UpdateEmployee(id, request, props.csrf_token)
        } else {
            service = CreateEmployee(request, props.csrf_token)
        }

        service.then((response: Response<Employee>) => {
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
                    { id ? 'Edit Employee' : 'Create Employee' }
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
                        name="email"
                        label="Email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    { !id ? (
                        <Input
                            name="password"
                            label="Password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    ) : <></> }
                    <Checkbox
                        name="is_active"
                        label="Is active"
                        checked={form.is_active}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <Datepicker
                        name="joined_at"
                        label="Joined At"
                        required
                        value={form.joined_at}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <PositionSelect
                        name="position_id"
                        label="Position"
                        required
                        value={form.position_id}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <h4 className="border-b border-b-slate-200">
                        BPJS
                    </h4>
                    <Input 
                        name="bpjs.name"
                        label="Name"
                        value={form.bpjs.name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <Input 
                        name="bpjs.number"
                        label="Number"
                        value={form.bpjs.number}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <Dropbox
                        id="employee-form"
                        name="bpjs_file"
                        accept=".pdf"
                        onChange={handleChange}
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