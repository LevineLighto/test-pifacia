import { ChangeEventHandler, FC } from "react";
import { CheckboxProps } from "./props";
import { containerClasses, iconClasses, inputClasses, inputWrapperClasses, labelClasses, requiredClasses } from "./classes";
import { Check } from "react-feather";

export const Checkbox : FC<CheckboxProps> = ({
    label,
    name = '',
    id = '',
    onChange,
    className = '',
    containerClassName = '',
    required = false,
    ...props
}) => {
    const inputId = `checkbox-${name}-${id}`

    const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        if (typeof onChange != 'function') {
            return
        }

        const target    = event.target
        const value     = target.checked

        onChange({
            name    : name || '',
            value   : value
        })
    }

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
            <div
                className={`${
                    className
                }`}
            >
                <div
                    className={`${
                        inputWrapperClasses.display
                    } ${
                        inputWrapperClasses.grid
                    } ${
                        inputWrapperClasses.margin
                    }`}
                >
                    <input
                        id={inputId}
                        name={name}
                        onChange={handleChange}
                        required={required}
                        type="checkbox"
                        className={`${
                            inputClasses.appearance
                        } ${
                            inputClasses.background
                        } ${
                            inputClasses.border
                        } ${
                            inputClasses.borderRadius
                        } ${
                            inputClasses.display
                        } ${
                            inputClasses.grid
                        } ${
                            inputClasses.height
                        } ${
                            inputClasses.peer
                        } ${
                            inputClasses.width
                        }`}
                        {...props}
                    />
                    <Check
                        className={`${
                            iconClasses.color
                        } ${
                            iconClasses.display
                        } ${
                            iconClasses.event
                        } ${
                            iconClasses.grid
                        }`}
                        size=".875rem"
                        strokeWidth={4}
                    />
                </div>
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
            </div>
        </div>
    )
}