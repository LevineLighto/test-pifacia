import { BaseModel } from "@/types"

export interface User extends BaseModel {
    name    : string
    email   : string
    role?   : Role
}

export interface Role extends BaseModel {
    name    : string
    code        : string
    is_active   : boolean
    editable    : boolean
    permissions?: Permission[]
}

export interface Permission extends BaseModel {
    name: string
    code: string
}