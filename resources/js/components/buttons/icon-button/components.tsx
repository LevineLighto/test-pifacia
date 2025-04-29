import { FC } from "react";
import { IconButtonProps } from "./props";

export const IconButton : FC<IconButtonProps> = ({
    className = '',
    variant = 'solid',
    ...props
}) => (
    <button
        className={`${
            "rounded-full p-2 border border-primary hover:border-primary-700 outline-0 cursor-pointer"
        } ${
            variant == 'solid' ? 'bg-primary hover:bg-primary-700 text-white' : 'bg-transparent hover:bg-primary-400 text-primary hover:text-white'
        }`}
        {...props}
    />
)