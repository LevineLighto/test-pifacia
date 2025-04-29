import { ComponentPropsWithRef } from "react";

export interface IconButtonProps extends ComponentPropsWithRef<'button'> {
    variant? : 'solid' | 'outline'
}