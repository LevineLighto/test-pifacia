'use client'

import { ChangeEventHandler, ComponentPropsWithoutRef, FC, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { SearchableSelectProps } from "./props"
import { BaseModel } from "@/types"
import { ChevronDown, ChevronUp, X } from "react-feather"
import { 
    containerClasses,
    controlItemClasses, 
    controlWrapperClasses, 
    dropdownClasses, 
    dropdownItemClasses, 
    inputClasses, 
    inputWrapperClasses, 
    labelClasses, 
    requiredClasses, 
    resizerClasses, 
    selectedValueClasses, 
    wrapperClasses 
} from "./classes"

export const SearchableSelect : FC<SearchableSelectProps> = ({
    id,
    name,
    label,
    itemLabelKey = '',
    onSearch,
    onChange,
    multiple            = false,
    required            = false,
    loading             = false,
    disabled            = false,
    containerClassName  = '',
    data,
    value,
    search = '',
    render,
    notFoundMessage     = 'Unable to find any data',
    emptyMessage        = 'No more data to select',
    searchPlaceholder   = 'Search by name or code',
    hideSelected        = false,
}) => {
    const triggerEffectRef  = useRef(false)
    const searchRef         = useRef<HTMLInputElement>(null)
    const resizerRef        = useRef<HTMLDivElement>(null)
    const changeTimeoutRef  = useRef<null|ReturnType<typeof setTimeout>>(null)
    const searchTimeoutRef  = useRef<null|ReturnType<typeof setTimeout>>(null)
    const blurTimeoutRef    = useRef<null|ReturnType<typeof setTimeout>>(null)

    const [focused, setFocused]     = useState(false)
    const [searchVal, setSearchVal] = useState(search)
    const [selectedItems, setSelectedItems] = useState<BaseModel[]>([])

    const filtered = useMemo(() => {
        if (!data?.length) {
            return []
        }

        if (!multiple) {
            return data
        }

        return data.filter((item) => selectedItems.findIndex((selected) => item.id == selected.id))
    }, [data, selectedItems, multiple])

    const handleSearch = (value: string) => {
        if (disabled) {
            return
        }

        setSearchVal(value)

        if (typeof onSearch != 'function') {
            return
        }

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
        }

        searchTimeoutRef.current = setTimeout(() => {
            onSearch(value)
        }, 300)
    }

    const handleChangeSearch : ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value
        handleSearch(value)
    }

    const handleResetSearch = () => {
        handleSearch('')
    }

    const handleFocusSearch : FocusEventHandler = (event) => {
        if (disabled) {
            return
        }

        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current)
        }

        setFocused(true)
    }

    const handleBlurSearch : FocusEventHandler = (event) => {
        if (disabled) {
            return
        }

        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current)
        }

        blurTimeoutRef.current = setTimeout(() => {
            setFocused(false)
            handleResetSearch()
        }, 300)
    }

    const handleBackspaceSearch : KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (disabled) {
            return
        }

        if (!multiple) {
            return
        }

        if ((event.target as HTMLInputElement).value != '') {
            return
        }

        if (!selectedItems.length) {
            return
        }

        triggerEffectRef.current = true
        setSelectedItems((prevState) => {
            const modifiedSelection = [...prevState]
            modifiedSelection.pop()
    
            return modifiedSelection
        })
    }

    const handleKeydownSearch : KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Backspace') {
            handleBackspaceSearch(event)
        }
    }

    const handleClickContainer = () => {
        if (disabled) {
            return
        }

        searchRef.current?.focus()
    }

    const handleSelectOption = (model: BaseModel) : MouseEventHandler<HTMLDivElement> => {
        return (event) => {
            if (disabled) {
                return
            }

            if (!multiple) {
                event.stopPropagation()
            }

            triggerEffectRef.current = true
            if (multiple) {
                setSelectedItems((prevState) => {
                    return [...prevState, model]
                })
            } else {
                setSelectedItems([model])
            }
        }
    }

    const handleRemoveSelection = (model : BaseModel) : MouseEventHandler<HTMLSpanElement> => {
        return (event) => {
            if (disabled) {
                return
            }

            if (!multiple) {
                return
            }

            triggerEffectRef.current = true
            setSelectedItems((prevState) => {
                const modifiedSelection = [...prevState]
                const index = modifiedSelection.findIndex((item) => item.id == model.id)
                if (index != -1) {
                    modifiedSelection.splice(index, 1)
                }
    
    
                return modifiedSelection
            })
        }
    }

    const handleClear = () => {
        triggerEffectRef.current = true
        setSelectedItems([])
        handleResetSearch()
    }

    useLayoutEffect(() => {
        if (!multiple) {
            return
        }

        if (!resizerRef.current || !searchRef.current) {
            return
        }

        resizerRef.current.textContent = search || ''
        let width = `${Math.max(resizerRef.current.offsetWidth, 8)}px`
        if (!selectedItems.length) {
            width = ''   
        }
        searchRef.current.style.width = width

    }, [search, selectedItems, multiple])

    useEffect(() => {
        if (!value && !selectedItems.length) {
            return
        }

        if (!value) {
            triggerEffectRef.current = false
            setSelectedItems([])
            return
        }

        if (value == selectedItems) {
            return
        }

        if (Array.isArray(value)) {
            if (!value.length) {
                triggerEffectRef.current = false
                setSelectedItems([])
                
                return
            }

            if (typeof value[0] == 'string') {
                if (!data?.length) {
                    return
                }

                const items = data.filter((item) => (value).includes(item.id))
                setSelectedItems(items)
                triggerEffectRef.current = false

                return
            }

            setSelectedItems(value as BaseModel[])

            return
        }


        if (typeof value == 'string') {
            if (!data?.length) {
                return
            }

            const item = data?.find((item) => item.id == value)
            setSelectedItems(item ? [item] : [])
            triggerEffectRef.current = false

            return
        }

        if (value.id) {
            setSelectedItems([value])
            triggerEffectRef.current = false
        }
    }, [value, data])

    useEffect(() => {
        if (typeof onChange != 'function' || !triggerEffectRef.current) {
            return
        }

        changeTimeoutRef.current = setTimeout(() => {
            let value;
            if (multiple) {
                value = selectedItems.map(item => item.id)
            } else {
                value = selectedItems[0]?.id || ''
            }
    
            onChange({name, value, selected: multiple ? selectedItems : selectedItems[0]})
        }, 300)

        return () => { 
            if (changeTimeoutRef.current) {
                clearTimeout(changeTimeoutRef.current)
            }
        }
    }, [selectedItems])

    useEffect(() => {
        return () => {
            if (changeTimeoutRef.current) {
                clearTimeout(changeTimeoutRef.current)
            }

            if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current)
            }

            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current)
            }
        }
    }, [])

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
                    htmlFor={`search-${id}`}
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
                    ) : <></> }
                </label>
            ) : (<></>)}
            <div 
                className={`${
                    wrapperClasses.appearance
                } ${
                    wrapperClasses.background[ disabled ? 'disabled' : 'normal' ]
                } ${
                    wrapperClasses.border.default
                } ${
                    wrapperClasses.border[ disabled ? 'disabled' : focused ? 'focused' : 'normal' ]
                } ${
                    wrapperClasses.borderRadius
                } ${
                    wrapperClasses.color
                } ${ 
                    wrapperClasses.display
                } ${
                    wrapperClasses.maxWidth
                } ${
                    wrapperClasses.outline
                } ${
                    wrapperClasses.padding
                } ${
                    wrapperClasses.position
                } ${
                    wrapperClasses.width
                }`}
                onClick={handleClickContainer}
            >
                <div 
                    className={`${
                        inputWrapperClasses.cursor
                    } ${
                        inputWrapperClasses.display
                    } ${
                        inputWrapperClasses.flex
                    } ${
                        inputWrapperClasses.gap
                    } ${
                        inputWrapperClasses.minWidth
                    } ${
                        inputWrapperClasses.overflow
                    } ${
                        inputWrapperClasses.position
                    }`}
                >
                    { !hideSelected ? selectedItems.map((item) => (
                        <div 
                            key={`selected-${item.id}`}
                            className={multiple ? `${
                                selectedValueClasses.multiple.border
                            } ${
                                selectedValueClasses.multiple.display
                            } ${
                                selectedValueClasses.multiple.padding
                            }` : `${
                                selectedValueClasses.single.display[ searchVal.length ? 'searching' : 'normal' ]
                            } ${
                                selectedValueClasses.single.position
                            }`}
                        >
                            <span>
                                { item[itemLabelKey] }
                            </span>
                            { multiple ? (
                                <span 
                                    className="cursor-pointer"
                                    onClick={handleRemoveSelection(item)}
                                >
                                    <X size="1em"/>
                                </span>
                            ) : (<></>) }
                        </div>
                    )) : (<></>) }
                    <input 
                        ref={searchRef}
                        onChange={handleChangeSearch}
                        value={searchVal}
                        id={`search-${id}`}
                        onFocus={handleFocusSearch}
                        onBlur={handleBlurSearch}
                        placeholder={searchPlaceholder}
                        onKeyDown={handleKeydownSearch}
                        disabled={disabled}
                        required={required && !selectedItems.length}
                        className={`${
                            inputClasses.border
                        } ${
                            inputClasses.color
                        } ${
                            inputClasses.display
                        } ${
                            inputClasses.margin
                        } ${
                            inputClasses.opacity[ selectedItems.length && !hideSelected ? 'filled' : 'empty' ]
                        } ${
                            inputClasses.outline
                        } ${
                            inputClasses.padding
                        }`}
                    />
                </div>
                <div 
                    className={`${
                        controlWrapperClasses.display
                    } ${
                        controlWrapperClasses.flex
                    }`}
                >
                    { selectedItems.length && !disabled ? (
                        <Control
                            onClick={handleClear}
                        >
                            <X size="1.2rem"/>
                        </Control>
                    ) : (<></>) }
                    <Control>
                        { focused ? (
                            <ChevronUp size="1.2rem"/>
                        ) : (
                            <ChevronDown size="1.2rem"/>
                        ) }
                    </Control>
                </div>
                <div 
                    className={`${
                        dropdownClasses.background
                    } ${
                        dropdownClasses.borderRadius
                    } ${
                        dropdownClasses.boxShadow
                    } ${
                        dropdownClasses.display[ focused ? 'open' : 'closed' ]
                    } ${
                        dropdownClasses.maxHeight[ focused ? 'open' : 'closed' ]
                    } ${
                        dropdownClasses.padding
                    } ${
                        dropdownClasses.position
                    } ${
                        dropdownClasses.transition
                    } ${
                        dropdownClasses.translate
                    } ${
                        dropdownClasses.zIndex
                    }`}
                >
                    { loading ? (
                        <DropdownItem
                            className="text-slate-300"
                        >
                            Loading ...
                        </DropdownItem>
                    ) : !data?.length ? (
                        <DropdownItem
                            className="text-primary"
                        >
                            { notFoundMessage }
                        </DropdownItem>
                    ) : !filtered.length ? (
                        <DropdownItem
                            className="text-slate-300"
                        >
                            { emptyMessage }
                        </DropdownItem>
                    ) : filtered.map((item) => (
                        <DropdownItem
                            key={item.id}
                            onClick={handleSelectOption(item)}
                        >
                            { typeof render == 'function' ? (
                                render(item)
                            ) : (
                                <div className="flex-grow-1">
                                    <p className="fw-semibold mb-1">
                                        { item[itemLabelKey] }
                                    </p>
                                </div>
                            ) }
                        </DropdownItem>
                    )) }
                </div>
                <div 
                    className={`${
                        resizerClasses.height
                    } ${
                        resizerClasses.overflow
                    } ${
                        resizerClasses.position
                    }`}
                    ref={resizerRef}
                />
            </div>
        </div>
    )
}

const Control : FC<ComponentPropsWithoutRef<'div'>> = ({
    className = '',
    ...props
}) => (
    <div
        className={`${
            controlItemClasses.border
        } ${
            controlItemClasses.color
        } ${
            controlItemClasses.cursor
        } ${
            controlItemClasses.padding
        } ${
            className
        }`}
        {...props}
    />
)

const DropdownItem : FC<ComponentPropsWithoutRef<'div'>> = ({
    className = '',
    ...props
}) => (
    <div
        className={`${
            dropdownItemClasses.background
        } ${
            dropdownItemClasses.cursor
        } ${
            dropdownItemClasses.display
        } ${
            dropdownItemClasses.flex
        } ${
            dropdownItemClasses.gap
        } ${
            dropdownItemClasses.padding
        } ${
            className
        }`}
        {...props}
    />
)