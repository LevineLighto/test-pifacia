export interface DropboxFileItem {
    id      : string
    files?  : File[]
}

export type SetFilesFunction = (id: string, files: File[]) => void
export type GetFilesFunction = (id: string) => undefined | File[]

export interface DropboxContextType {
    reset   : (id: string | undefined) => void
    setFiles: SetFilesFunction
    getFiles: GetFilesFunction
}

export interface DisplayFile {
    id      : string
    name?   : string
    url?    : string
}