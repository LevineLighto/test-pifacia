import { FC } from "react";
import { StatusSelectProps } from "./props";
import { SearchableSelect } from "../searchable-select";
import { Statuses } from "./constants";

export const StatusSelect : FC<StatusSelectProps> = (props) => (
    <SearchableSelect
        name="is_active"
        label="Status"
        itemLabelKey="label"
        data={Statuses}
        {...props}
    />
)