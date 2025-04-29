import { PropsWithChildren } from "react"

export interface DataDisplayProps extends PropsWithChildren {
    label               : string
    className?          : string
    containerClassName? : string
    truncated?          : boolean
}