import { createContext, FC, PropsWithChildren, useCallback, useState } from "react";
import { DropboxContextType, DropboxFileItem, GetFilesFunction, SetFilesFunction } from "./types";

export const DropboxContext = createContext<DropboxContextType|null>(null)
export const DropboxProvider : FC<PropsWithChildren> = ({ children }) => {
    const [files, setFiles] = useState<DropboxFileItem[]>([])

    const reset = useCallback((id = '') => {
        setFiles((prevState) => {
            if (!id) {
                return []
            }

            const modified = [ ...prevState ]
            const index = modified.findIndex((file) => file.id == id)
            if (index < 0) {
                modified[index] = {
                    ...modified[index],
                    files: []
                }
            }
            
            return modified
        })
    }, [setFiles])

    const handleSetFiles = useCallback<SetFilesFunction>((id, files) => {
        setFiles((prevState) => {
            const modified = [ ...prevState ]
            const index = modified.findIndex((file) => file.id == id)
            if (index > -1) {
                modified[index] = {
                    ...modified[index],
                    files: files
                }
            } else {
                modified.push({
                    id      : id,
                    files   : files
                })
            }

            return modified
        })
    }, [])

    const handleGetFiles = useCallback<GetFilesFunction>((id) => {
        const entry = files.find((file) => file.id == id)
        return entry?.files
    }, [files])

    return (
        <DropboxContext
            value={{
                reset: reset,
                setFiles: handleSetFiles,
                getFiles: handleGetFiles
            }}
        >
            { children }
        </DropboxContext>
    )
}