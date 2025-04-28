'use client'

import { objectToUrl, SwrFetcher } from "@/functions/fetch"
import { useMemo } from "react"
import { default as useSWR } from "swr"

export const useSwr = (
    url     : string,
    filter  : Record<string, any> | false = {},
    refreshOnInterval : boolean = false
) => {
    const target = useMemo(() => {
        if (!url) {
            return null
        }

        if (filter === false) {
            return null
        }

        return objectToUrl(url as string, filter)
    }, [url, filter])

    return useSWR(target, SwrFetcher, {
        shouldRetryOnError: false,
        refreshInterval: (data) => {
            if (!refreshOnInterval || data?.status.code != 200) {
                return 0
            }

            return 2000
        }
    })
}