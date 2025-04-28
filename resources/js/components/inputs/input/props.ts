import { ComponentPropsWithoutRef } from "react";
import { InputChangeHandler } from "../types";

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
    onChange?           : InputChangeHandler
    containerClassName? : string
    label?              : string
}