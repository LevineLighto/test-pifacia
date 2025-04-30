import { toast } from "react-toastify";
import { RequestParams, Response } from "./types";

export const SwrFetcher = async <Data = any> (url: RequestInfo | URL, init: RequestInit = {}) : Promise<Response<Data>> => {
    return fetch(url, init).then(res => res.json())
}

const BaseFetcher = async <Data = any>(method: string, params: RequestParams) : Promise<Response<Data>> => {
    let url : string | URL = params.url
    let data = params.data

    const headers : HeadersInit = {
        "Accept"        : 'application/json',
        "X-CSRF-TOKEN"  : params.csrf_token || ''
    }

    const isFormData = data instanceof FormData
    
    method = method.toLowerCase()
    if (method == 'get') {
        url = objectToUrl(url, params.data as Record<string, any>)
    } else if (method != 'post' && isFormData){
        (data as FormData).append('_method', method)
        method = 'post'
    } else if (!(isFormData)) {
        headers['Content-type'] = 'application/json'
        data = JSON.stringify(data)
    }

    const response = await fetch(url, {
        headers : headers,
        method  : method,
        body    : method != 'get' ? data as BodyInit : null
    })

    const result : Response<Data> =  await response.json()

    if (!response.ok) {
        toast.error(result.status.message)
    }

    return result
}

export const objectToUrl = (url: string, data: Record<string, any>) : string => {
    const target = new URL(url)

    for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
            continue
        }

        let value = data[key]

        if (value instanceof Date) {
            value = value.toISOString()
        }

        if (Array.isArray(value)) {
            value = value.join(',')
        }

        target.searchParams.append(key, value)
    }

    return target.toString()
}

export const GET = async <Data = any> (params: RequestParams) : Promise<Response<Data>> => {
    return await BaseFetcher('get', params)
}

export const POST = async <Data = any> (params: RequestParams) : Promise<Response<Data>> => {
    return await BaseFetcher('post', params)
}

export const PUT = async <Data = any> (params: RequestParams) : Promise<Response<Data>> => {
    return await BaseFetcher('put', params)
}

export const DELETE = async <Data = any> (params: RequestParams) : Promise<Response<Data>> => {
    return await BaseFetcher('delete', params)
}