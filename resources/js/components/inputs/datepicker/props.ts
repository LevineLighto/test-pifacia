import { InputChangeHandler } from "../types";
import { DatePickerProps } from "react-datepicker";

export interface DatepickerProps extends Omit<DatePickerProps, 'onChange' | 'value'> {
    onChange?           : InputChangeHandler
    containerClassName? : string
    label?              : string
    value?              : string | Date
}