import { SearchableSelectProps } from "../searchable-select";

export type StatusSelectProps = Omit<SearchableSelectProps, 'name' | 'data' | 'label'>