import { Role } from "@/account/types";
import { SearchableSelectProps } from "@/components/inputs";

export type RoleSelectProps = Omit<SearchableSelectProps<Role>, 'data'|'itemLabelKey'|'onSearch'|'loading'>