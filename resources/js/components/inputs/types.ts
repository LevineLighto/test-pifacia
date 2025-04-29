export interface InputChangeParams<T> {
    name: string
    value: T
}

export type InputChangeHandler<T = any> = (params: InputChangeParams<T>) => void

export interface SelectChangeResult<Data = any, Selected = Record<string, any>> extends InputChangeParams<Data> {
    selected?: Selected | Selected[]
}

export type SelectChangeHandler<Value = any, Selected = Record<string, any>> = (result: SelectChangeResult<Value, Selected>) => void