import { BaseFilter } from "@/types/forms"

export interface DivisionRequest {
    name        : string
    code        : string
    is_active   : boolean
    scope?      : string[]
}

export interface DivisionFilter extends BaseFilter {
    is_active   : string
}

export interface DivisionImportRequest {
    file        : string
    headings    : {
        name        : string
        code        : string
        scope       : string
        is_active   : string
    }
}

export interface PositionRequest {
    name        : string
    code        : string
    is_active   : boolean
    scope?      : string[]
    division_id?: string
}

export interface PositionFilter extends BaseFilter {
    is_active   : string
    division_id?: string
}

export interface PositionImportRequest {
    file        : string
    headings    : {
        name        : string
        code        : string
        scope       : string
        is_active   : string
        division    : string
    }
}

export interface EmployeeRequest {
    name        : string
    email       : string
    password?   : string
    is_active   : boolean
    joined_at   : Date | string
    bpjs        : Record<string, any>
    bpjs_file?  : File[]
    position_id?: string
}

export interface EmployeeFilter extends BaseFilter {
    is_active   : string
    position_id?: string
    joined_from?: Date | string
    joined_to?  : Date | string
}

export interface EmployeeImportRequest {
    file        : string
    headings    : {
        name        : string
        email       : string
        password    : string
        is_active   : string
        joined_at   : string
        division    : string
        position    : string
    }
}

export interface ImportUploadRequest {
    file : File[]
}
