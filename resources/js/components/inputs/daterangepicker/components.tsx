import { FC, useCallback } from "react";
import DatePicker from "react-datepicker";
import { containerClasses, inputClasses, inputWrapperClasses, labelClasses, requiredClasses } from "./classes";
import { DaterangepickerProps } from "./props";

export const Daterangepicker : FC<DaterangepickerProps> = ({
    onChange,
    containerClassName = '',
    className = '',
    label = '',
    required = false,
    id = '',
    fromDate,
    fromDateName = '',
    toDate,
    toDateName = '',
    ...props
}) => {
    const inputId = `daterangepicker-${id}`

    const handleChangeFrom = useCallback((date: Date | null) => {
        if (typeof onChange == 'function') {
            onChange({name: fromDateName, value: date})
        }
    }, [onChange, fromDateName])

    const handleChangeTo = useCallback((date: Date | null) => {
        if (typeof onChange == 'function') {
            onChange({name: toDateName, value: date})
        }
    }, [onChange, toDateName])

    return (
        <div
            className={`${
                containerClasses.display
            } ${
                containerClasses.gap
            } ${
                containerClasses.padding
            } ${
                containerClassName
            }`}
        >
            { label ? (
                <label
                    htmlFor={inputId}
                    className={`${
                        labelClasses.color
                    } ${
                        labelClasses.display
                    }`}
                >
                    { label }
                    { required ? (
                        <span
                            className={`${
                                requiredClasses.color
                            }`}
                        > *</span>
                    ) : (<></>) }
                </label>
            ) : (<></>) }
            <div 
                className={`${
                    inputWrapperClasses.display
                } ${
                    inputWrapperClasses.gap
                } ${
                    inputWrapperClasses.grid
                }`}
            >
                <div>
                    <DatePicker
                        selectsStart
                        id={inputId}
                        onChange={handleChangeFrom}
                        dateFormat={"dd MMMM yyyy"}
                        className={`${
                            inputClasses.background
                        } ${
                            inputClasses.border
                        } ${
                            inputClasses.borderRadius
                        } ${
                            inputClasses.color
                        } ${
                            inputClasses.display
                        } ${
                            inputClasses.outline
                        } ${
                            inputClasses.padding
                        } ${
                            inputClasses.width
                        } ${
                            className
                        }`}
                        popperPlacement="bottom-start"
                        required={required}
                        selected={fromDate}
                        { ...props as any }
                    />
                </div>
                <div>
                    <DatePicker
                        selectsEnd
                        id={`${inputId}-end`}
                        onChange={handleChangeTo}
                        dateFormat={"dd MMMM yyyy"}
                        className={`${
                            inputClasses.background
                        } ${
                            inputClasses.border
                        } ${
                            inputClasses.borderRadius
                        } ${
                            inputClasses.color
                        } ${
                            inputClasses.display
                        } ${
                            inputClasses.outline
                        } ${
                            inputClasses.padding
                        } ${
                            inputClasses.width
                        } ${
                            className
                        }`}
                        popperPlacement="bottom-start"
                        required={required}
                        selected={toDate}
                        { ...props as any }
                    />
                </div>
            </div>
        </div>
    )
}