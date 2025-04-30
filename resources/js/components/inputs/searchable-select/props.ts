import { BaseModel } from "@/types"
import { SelectChangeHandler } from "../types"
import { ReactNode } from "react"

export interface SearchableSelectProps<Data = BaseModel> {
    id?                 : string
    name                : string
    label?              : string
    multiple?           : boolean
    required?           : boolean
    loading?            : boolean
    disabled?           : boolean
    containerClassName? : string
    data?               : Data[]
    value?              : any | any[]
    search?             : string
    itemLabelKey?       : string
    onSearch?           : (value: string) => any
    onChange?           : SelectChangeHandler
    render?             : (item: BaseModel | any) => ReactNode
    emptyMessage?       : string
    notFoundMessage?    : string
    searchPlaceholder?  : string
    hideSelected?       : boolean
}
