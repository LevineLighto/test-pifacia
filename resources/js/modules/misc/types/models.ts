import { BaseModel } from "@/types";

export interface Activity extends BaseModel {
    type        : string
    sub_type    : string
    action      : string
    description : string
    url         : string
    properties  : any
}