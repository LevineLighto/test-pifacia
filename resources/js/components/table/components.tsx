import { ComponentPropsWithRef, FC } from "react";

export const Table: FC<ComponentPropsWithRef<'table'>> = ({
    className = '',
    ...props
}) => (
    <table
        className={`${
            "table"
        } ${
            className
        }`}
        {...props}
    />
)