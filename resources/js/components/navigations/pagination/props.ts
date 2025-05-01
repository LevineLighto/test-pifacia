import { ElementType } from "react"

export interface PaginationProps {
    max?            : number
    page?           : number
    onClick?        : (page : number) => any
}