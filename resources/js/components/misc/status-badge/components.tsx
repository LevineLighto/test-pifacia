import { FC } from "react";
import { StatusBadgeProps } from "./props";

export const StatusBadge : FC<StatusBadgeProps> = ({
    active = false,
    className = '',
}) => (
    <span
        className={`${
            "px-2 py-1 rounded-xl inline-block text-white"
        } ${
            active ? 'bg-emerald-500' : 'bg-primary'
        } ${
            className
        }`}
    >
        { active ? 'Active' : 'Inactive' }
    </span>
)