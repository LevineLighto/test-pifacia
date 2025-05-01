import { BaseModel } from "@/types";

export interface Division extends BaseModel {
    name        : string
    code        : string
    is_active   : boolean
    scope       : string[]
    positions?  : Position[]
}

export interface Position extends BaseModel {
    name        : string
    code        : string
    is_active   : boolean
    scope       : string[]
    division    : Division
    employees?  : Employee[]
}

export interface Employee extends BaseModel {
    name            : string
    email           : string
    is_active       : boolean
    bpjs            : Record<string, any>
    bpjs_file?      : string
    position        : Position
    division?       : Division
    joined_at       : string
    raw_joined_at   : string
}