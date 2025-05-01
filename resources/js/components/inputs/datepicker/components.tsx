import { FC, useCallback } from "react";
import DatePicker from "react-datepicker";
import { containerClasses, inputClasses, labelClasses, requiredClasses } from "./classes";
import { DatepickerProps } from "./props";

export const Datepicker : FC<DatepickerProps> = ({
    name = '',
    onChange,
    containerClassName = '',
    className = '',
    label = '',
    required = false,
    id = '',
    value,
    ...props
}) => {
    const inputId = `datepicker-${name}-${id}`

    const handleChange = useCallback((date: Date | null) => {
        if (typeof onChange == 'function') {
            onChange({name: name, value: date})
        }
    }, [onChange, name])

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
            <DatePicker
                id={inputId}
                onChange={handleChange}
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
                selected={value}
                popperPlacement="bottom-start"
                required={required}
                { ...props as any }
            />
        </div>
    )
}