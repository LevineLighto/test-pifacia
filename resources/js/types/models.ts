export interface BaseModel {
    id: string
    created_at? : string
    created_by? : { id: string, name: string }
    updated_at? : string
    updated_by? : { id: string, name: string }
    deleted_at? : string
    deleted_by? : { id: string, name: string }
}