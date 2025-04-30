import { BaseFilter } from "@/types/forms"

export interface UserRequest {
    name    : string
    email   : string
    password: string
    role_id : string
}

export interface RoleRequest {
    name        : string
    code        : string
    is_active   : boolean
}

export interface RoleFilter extends BaseFilter {
    is_active   : string
}

export interface AssignPermissionRequest {
    permission_ids: string[]
}

export interface AssignPermissionFormItem {
    id      : string
    name    : string
    code    : string
    checked : boolean
    disabled: boolean
}

export type AssignPermissionForm = Record<string, AssignPermissionFormItem>
