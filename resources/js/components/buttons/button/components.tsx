import { FC } from "react";
import { ButtonProps } from "./props";
import { ButtonClasses } from "./classes";

export const Button : FC<ButtonProps> = ({
    variant = 'solid',
    className = '',
    ...props
}) => (
    <button
        className={`${
            ButtonClasses.background[variant]
        } ${
            ButtonClasses.border[variant]
        } ${
            ButtonClasses.borderRadius
        } ${
            ButtonClasses.color[variant]
        } ${
            ButtonClasses.cursor
        } ${
            ButtonClasses.outline
        } ${
            ButtonClasses.padding
        } ${
            className
        }`}
        {...props}
    />
)