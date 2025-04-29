import { PropsWithChildren, ReactNode } from "react";

export interface OffcanvasProps extends PropsWithChildren {
    open?   : boolean
    title?  : ReactNode
    onClose?: () => void
}