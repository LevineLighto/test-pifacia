import { FC } from "react";
import { DataDisplayProps } from "./props";

export const DataDisplay : FC<DataDisplayProps> = ({
    label,
    children,
    className,
    containerClassName,
}) => (
    <div className={containerClassName}>
        <p className="text-slate-400 mb-0">
            { label }
        </p>
        <p className={className}>
            { children }
        </p>
    </div>
)