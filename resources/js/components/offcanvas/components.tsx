'use client'

import { FC } from "react"
import { OffcanvasProps } from "./props"
import { X } from "react-feather"
import { bodyClasses, buttonClasses, containerClasses, headerClasses } from "./classes"

export const Offcanvas : FC<OffcanvasProps> = ({
    title,
    open,
    onClose,
    children
}) => {
    return (
        <section
            className={`${
                containerClasses.background
            } ${
                containerClasses.border
            } ${
                containerClasses.height
            } ${
                containerClasses.maxWidth[open? 'open' : 'closed']
            } ${
                containerClasses.overflow
            } ${
                containerClasses.position
            } ${
                containerClasses.width
            } ${
                containerClasses.zIndex
            }`}
        >
            <header 
                className={`${
                    headerClasses.background
                } ${
                    headerClasses.display
                } ${
                    headerClasses.flex
                } ${
                    headerClasses.padding
                } ${
                    headerClasses.position
                }`}
            >
                <button
                    type="button"
                    className={`${
                        buttonClasses.background
                    } ${
                        buttonClasses.border
                    } ${
                        buttonClasses.cursor
                    } ${
                        buttonClasses.flex
                    } ${
                        buttonClasses.margin
                    } ${
                        buttonClasses.padding
                    }`}
                    onClick={onClose}
                >
                    <X size="1.75rem"/>
                </button>
                <div className="grow-1">
                    { title }
                </div>
            </header>
            <section 
                className={`${
                    bodyClasses.padding
                }`}
            >
                { children }
            </section>
        </section>
    )
}