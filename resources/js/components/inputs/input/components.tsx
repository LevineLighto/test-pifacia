import { ChangeEventHandler, FC } from "react";
import { InputProps } from "./props";
import { containerClasses, inputClasses, labelClasses, requiredClasses } from "./classes";

export const Input : FC<InputProps> = ({
    label,
    name = '',
    id = '',
    onChange,
    className = '',
    containerClassName = '',
    required = false,
    ...props
}) => {
    const inputId = `input-${name}-${id}`

    const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        if (typeof onChange != 'function') {
            return
        }

        const target    = event.target
        const value     = target.value

        onChange({
            name: name || '',
            value: value
        })
    }

    return (
        <div
            className={`${
                containerClasses.display
            } ${
                label ? containerClasses.gap : ''
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
            <input
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
                id={inputId}
                name={name}
                onChange={handleChange}
                required={required}
                {...props}
            />
        </div>
    )
}