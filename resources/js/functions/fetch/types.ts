export interface Response<Data = any> {
    data        : Data | null
    pagination  : null | {
        count           : number
        total           : number
        current_page    : number
        per_page        : number
        total_page      : number
        pages           : {
            next        : number
            previous    : number
        }
    }
    status  : {
        code    : number
        message : string
    }
}

export interface RequestParams {
    url         : string
    data?       : RequestDataType
    csrf_token? : string
}

export type RequestDataType = Record<string, any> | FormData | string | undefined