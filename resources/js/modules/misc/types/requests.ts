import { BaseFilter } from "@/types/forms";

export interface ActivityFilter extends BaseFilter {
    from_date?   : string
    to_date?     : string
}