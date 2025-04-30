import { InputChangeHandler } from "@/components/inputs"

export interface ScopeInputProps {
    label?              : string
    name?               : string
    value?              : string[]
    onChange?           : InputChangeHandler<string[]>
    className?          : string
    containerClassName? : string
    required?           : boolean
    disabled?           : boolean
} 