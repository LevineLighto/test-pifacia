import { ComponentPropsWithRef, FC } from "react";
import { classes } from "./clasess";

export const Card : FC<ComponentPropsWithRef<'section'>> = ({
    className = '',
    ...props
}) => (
    <section
        className={`${
            classes.background
        } ${
            classes.border
        } ${
            classes.borderRadius
        } ${
            classes.padding
        } ${
            className
        }`}
        {...props}
    />
)