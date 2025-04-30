import { Division } from "@/hr/types";
import { SearchableSelectProps } from "@/components/inputs";

export type DivisionSelectProps = Omit<SearchableSelectProps<Division>, 'data'|'itemLabelKey'|'onSearch'|'loading'>