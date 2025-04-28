import { Icon } from "react-feather"

export interface SidebarContextType {
    open    : boolean
    toggle  : () => void
}

export interface SidebarItemType {
    label       : string
    icon        : Icon
    route       : string
    permissions?: string[]
}