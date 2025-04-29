import { InputChangeHandler } from "../types";
import { DatePickerProps } from "react-datepicker";

export interface DatepickerProps extends Omit<DatePickerProps, 'onChange'> {
    onChange?           : InputChangeHandler
    containerClassName? : string
    label?              : string
}