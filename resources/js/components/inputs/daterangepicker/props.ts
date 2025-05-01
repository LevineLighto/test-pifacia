import { InputChangeHandler } from "../types";
import { DatePickerProps } from "react-datepicker";

export interface DaterangepickerProps extends Omit<DatePickerProps, 'onChange' | 'value' | 'name'> {
    onChange?           : InputChangeHandler
    containerClassName? : string
    label?              : string
    fromDate?           : Date | string
    fromDateName?       : string
    toDate?             : Date | string
    toDateName?         : string
}