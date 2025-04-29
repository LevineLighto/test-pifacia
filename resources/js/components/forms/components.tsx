'use client'

import { ComponentPropsWithRef, FC, FormEventHandler, useCallback } from "react";

export const Form : FC<ComponentPropsWithRef<'form'>> = ({
    onSubmit,
    ...props
}) => {
    const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
        if (typeof onSubmit != 'function') {
            return
        }

        event.preventDefault()
        onSubmit(event)
    }

    return (
        <form
            onSubmit={handleSubmit}
            {...props}
        />
    )
}