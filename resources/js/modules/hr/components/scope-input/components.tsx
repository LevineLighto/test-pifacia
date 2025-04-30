import { ChangeEventHandler, FC, useRef } from "react";
import { addClasses, containerClasses, deleteClasses, inputClasses, inputWrapperClasses, labelClasses, requiredClasses } from "./classes";
import { ScopeInputProps } from "./props";
import { Plus } from "react-feather";
import { Button } from "@/components/buttons";

export const ScopeInput : FC<ScopeInputProps> = ({
    label,
    name = '',
    value = [],
    onChange,
    className = '',
    containerClassName = '',
    required = false,
    disabled = false,
}) => {
    const handleChange = (index : number) : ChangeEventHandler<HTMLInputElement> => {
        return (event) => {
            if (typeof onChange != 'function') {
                return
            }

            const modified = [ ...value ]
            modified[index] = event.target.value

            onChange({name: name, value: modified})
        }
    }

    const handleAdd = () => {
        if (typeof onChange != 'function') {
            return
        }

        const modified = [ ...value ]
        modified.push('')

        onChange({name: name, value: modified})
    }

    const handleDelete = (index: number) => {
        if (typeof onChange != 'function') {
            return
        }

        const modified = [ ...value ]
        modified.splice(index, 1)

        onChange({name: name, value: modified})
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
            { value.map((scope, index) => (
                <div
                    key={`scope-${index}`}
                    className={`${
                        inputWrapperClasses.display
                    } ${
                        inputWrapperClasses.flex
                    } ${
                        inputWrapperClasses.gap
                    } ${
                        inputWrapperClasses.margin
                    }`}
                >
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
                        name={name}
                        onChange={handleChange(index)}
                        required={required}
                        disabled={disabled}
                        value={scope}
                    />
                    <Plus
                        onClick={() => handleDelete(index)}
                        size="1.5rem"
                        className={`${
                            deleteClasses.color
                        } ${
                            deleteClasses.cursor
                        } ${
                            deleteClasses.rotate
                        }`}
                    />
                </div>
            )) }
            <Button
                type="button"
                variant="outline"
                onClick={handleAdd}
                disabled={disabled}
                className={`${
                    addClasses.display
                } ${
                    addClasses.flex
                } ${
                    addClasses.gap
                } ${
                    addClasses.width
                }`}
            >
                <Plus 
                    size="1.5rem"
                />
                <span>
                    New Scope
                </span>
            </Button>
        </div>
    )
}