import { InputChangeHandler } from "../types";
import { DatePickerProps } from "react-datepicker";

export interface DaterangepickerProps extends Omit<DatePickerProps, 'onChange' | 'value' | 'name'> {
    onChange?           : InputChangeHandler
    containerClassName? : string
    label?              : string
    fromDate?           : string
    fromDateName?       : string
    toDate?             : string
    toDateName?         : string
}