import { Dispatch, SetStateAction } from "react"

export interface FormContext<Data> {
    open        : boolean
    setOpen     : Dispatch<SetStateAction<boolean>>
    id          : string
    setId       : Dispatch<SetStateAction<string>>
    form        : Data
    setForm     : Dispatch<SetStateAction<Data>>
    reset       : () => void
    onSuccess?  : () => void
    setOnSuccess: Dispatch<SetStateAction<undefined | (() => void)>>
}

export interface BaseFilter {
    search  : string
    page    : number
    limit   : number
    sort_by : string
    sort_dir: string
}

export interface FilterContext<Data> {
    filter              : Data
    setFilter           : Dispatch<SetStateAction<Data>>
    committedFilter     : Data
    setCommittedFilter  : Dispatch<SetStateAction<Data>>
}