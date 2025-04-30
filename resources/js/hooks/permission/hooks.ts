'use client';

import { PageProps } from "@/types"
import { usePage } from "@inertiajs/react"
import { useMemo } from "react";

export const useHasPermission = (permissions: string | string[]) : boolean => {
    const { props } = usePage<PageProps>()

    return useMemo(() => {
        if (typeof permissions == 'string') {
            return props.permissions?.includes(permissions) || false
        }

        if (!permissions.length) {
            return true
        }
        
        if (!Array.isArray(props.permissions)) {
            return false
        }

        return permissions.filter(permission => props.permissions?.includes(permission)).length != 0
    }, [props, permissions])
}