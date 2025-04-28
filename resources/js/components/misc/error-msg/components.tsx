import { FC } from "react";
import { ErrorMsgProps } from "./props";
import { Card } from "@/components/card";
import { classes } from "./classes";

export const ErrorMsg : FC<ErrorMsgProps> = ({
    message = 'Something went wrong'
}) => (
    <Card
        className={`${
            classes.align
        } ${
            classes.color
        } ${
            classes.size
        }`}
    >
        { message }
    </Card>
)