import { InputChangeHandler } from "../types"
import { SortableItem } from "./types"

export interface SortButtonProps {
    onChange?   : InputChangeHandler
    sortable?   : SortableItem[]
    sort_by?    : string
    sort_dir?   : string
    className?  : string
    disabled?   : boolean
}

export interface SortItemProps extends SortableItem {
    onChange?   : InputChangeHandler
    name        : string
    checked?    : boolean
}