import { ChangeEventHandler, FC, MouseEventHandler, useCallback, useEffect, useState } from "react";
import { SortButtonProps, SortItemProps } from "./props";
import { Button } from "@/components/buttons";
import { List } from "react-feather";
import { circleClasses, inputClasses, labelClasses } from "./classes";
import { SortDir } from "./constants";

export const SortButton : FC<SortButtonProps> = ({
    sort_by,
    sort_dir,
    sortable,
    onChange,
    className = '',
    disabled = false,
}) => {
    const [open, setOpen] = useState(false)

    const handleToggle = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
        event.preventDefault()
        event.stopPropagation()
        setOpen((prevState) => !prevState)
    }, [])
    
    useEffect(() => {
        const closeDropdown = () => {
            setOpen(false)
        }

        document.addEventListener('click', closeDropdown)

        return (() => {
            document.removeEventListener('click', closeDropdown)
        })
    }, [])

    return (
        <div 
            className={`${
                "relative inline-block"
            } ${
                className
            }`}
        >
            <Button
                variant="outline"
                type="button"
                className="flex items-center gap-3"
                disabled={disabled}
                onClick={handleToggle}
            >
                <List/>
                <span>Sort By</span>
            </Button>
            { open ? (
                <div
                    className="rounded-lg overflow-hidden bg-white flex flex-col absolute bottom-0 translate-y-full shadow min-w-[10rem]"
                >
                    { sortable?.map((item) => (
                        <SortItem
                            key={`sortable-${item.value}`}
                            label={item.label}
                            value={item.value}
                            name="sort_by"
                            checked={sort_by == item.value}
                            onChange={onChange}
                        />
                    )) }
                    <hr className="border-slate-200"/>
                    { SortDir.map((item) => (
                        <SortItem
                            key={`sort-dir-${item.value}`}
                            label={item.label}
                            value={item.value}
                            name="sort_dir"
                            checked={sort_dir == item.value}
                            onChange={onChange}
                        />
                    )) }
                </div>
            ) : (<></>) }
        </div>
    )
}

const SortItem : FC<SortItemProps> = ({
    onChange,
    label,
    value,
    checked,
    name
}) => {
    const inputId = `radio-${name}-${value}`

    const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        if (typeof onChange != 'function') {
            return
        }

        const target    = event.target
        if (!target.checked) {
            return
        }

        const value     = target.value

        onChange({
            name    : name || '',
            value   : value
        })
    }

    const handleClick : MouseEventHandler<HTMLLabelElement> = (event) => {
        event.stopPropagation()

        if (typeof onChange != 'function') {
            return
        }

        onChange({
            name    : name,
            value: value
        })
    }

    return (
        <label
            className="bg-white cursor-pointer hover:bg-slate-200 px-4 py-2 flex gap-2 items-center"
            htmlFor={inputId}
            onClick={handleClick}
        >
            <span className="inline-grid grid-cols-1 shrink-0 grow-0">
                <input
                    id={inputId}
                    name={name}
                    type="radio"
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
                    checked={checked}
                    value={value}
                    onChange={handleChange}
                />
                <span 
                    className={`${
                        circleClasses.background
                    } ${
                        circleClasses.borderRadius
                    } ${
                        circleClasses.display
                    } ${
                        circleClasses.event
                    } ${
                        circleClasses.grid
                    } ${
                        circleClasses.height
                    } ${
                        circleClasses.width
                    }`}
                />
            </span>
            <span 
                className={`${
                    labelClasses.color
                } ${
                    labelClasses.display
                }`}
            >
                { label }
            </span>
        </label>
    )
}
