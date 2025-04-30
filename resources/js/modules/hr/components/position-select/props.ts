import { Position } from "@/hr/types";
import { SearchableSelectProps } from "@/components/inputs";

export type PositionSelectProps = Omit<SearchableSelectProps<Position>, 'data'|'itemLabelKey'|'onSearch'|'loading'>