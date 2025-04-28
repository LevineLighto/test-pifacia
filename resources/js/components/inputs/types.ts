export interface InputChangeParams<T> {
    name: string
    value: T
}

export type InputChangeHandler<T = any> = (params: InputChangeParams<T>) => void
