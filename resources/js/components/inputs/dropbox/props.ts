import { ComponentPropsWithRef } from "react";
import { InputChangeHandler } from "../types";

export interface DropboxProps extends Omit<ComponentPropsWithRef<'input'>, 'onChange' | 'type' | 'id' | 'hidden'> {
    id: string
    onChange?: InputChangeHandler
}

export interface DropboxDisplayProps {
    id          : string
    multiple?   : boolean
    onAdd?      : () => void
    onDelete?   : (index: number) => void
}

export interface DropboxEmptyBannerProps {
    multiple?   : boolean
    onClick?    : () => void
}

export interface DropOverlayProps {
    multiple?   : boolean
    active?     : boolean
}