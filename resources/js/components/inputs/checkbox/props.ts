import { ComponentPropsWithoutRef } from "react";
import { InputChangeHandler } from "../types";

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'type'> {
    onChange?           : InputChangeHandler
    containerClassName? : string
    label               : string
}