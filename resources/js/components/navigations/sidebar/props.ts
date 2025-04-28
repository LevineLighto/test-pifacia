import { Icon } from "react-feather"

export interface SidebarItemProps {
    label       : string
    icon        : Icon
    route       : string
    permissions?: string[]
}