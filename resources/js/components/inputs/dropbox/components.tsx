import { ChangeEventHandler, DragEventHandler, FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { DropboxDisplayProps, DropboxEmptyBannerProps, DropboxProps, DropOverlayProps } from "./props";
import { DropboxContext } from "./contexts";
import { DisplayFile, DropboxContextType } from "./types";
import { File, Plus, Upload } from "react-feather";
import { Button } from "@/components/buttons";

export const Dropbox : FC<DropboxProps> = ({
    id,
    multiple,
    name = '',
    className = '',
    onChange,
    ...props
}) => {
    const { getFiles, setFiles }        = useContext(DropboxContext) as DropboxContextType
    const [isDragOver, setIsDragOver]   = useState(false)
    const dragOverTimeoutRef            = useRef<ReturnType<typeof setTimeout>>(null)

    const files = useMemo(() => getFiles(id), [getFiles])
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = (files : File | File[] | FileList | null) => {
        if (!files) {
            files = []
        }

        if (files instanceof FileList) {
            files = [...files].map((file) => file)
        }

        if (!Array.isArray(files)) {
            files = [files]
        }

        setFiles(id, files)

        if (typeof onChange == 'function') {
            onChange({ name, value: files })
        }
    }

    const handleDrop : DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        handleFile(event.dataTransfer.files)
    }

    const handleDragOver : DragEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault()
        clearTimeout(dragOverTimeoutRef.current as ReturnType<typeof setTimeout>)

        if (!isDragOver) {
            setIsDragOver(true)
        }

        dragOverTimeoutRef.current = setTimeout(() => {
            setIsDragOver(false)
        }, 300)
    }

    const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        handleFile(event.target.files)
    }

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleRemove = (index: number) => {
        if (!files) {
            return
        }

        const modified = [...files]
        modified.splice(index, 1)

        setFiles(id, modified)
    }

    return (
        <div
            className={`${
                "border-slate-400 overflow-hidden relative"
            } ${
                files?.length ? 'border' : 'border-2 border-dashed'
            } ${
                className
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input 
                ref={inputRef}
                type="file" 
                multiple={multiple}
                onChange={handleChange}
                hidden
                { ...props }
            />
            { files?.length ? (
                <DropboxDisplay
                    id={id}
                    onAdd={handleClick}
                    onDelete={handleRemove}
                    multiple={multiple}
                />
            ) : (
                <DropboxEmptyBanner
                    onClick={handleClick}
                    multiple={multiple}
                />
            ) }
            <DropOverlay
                active={isDragOver}
            />
        </div>
    )
}

const DropboxDisplay : FC<DropboxDisplayProps> = ({
    id,
    multiple,
    onAdd,
    onDelete
}) => {
    const [files, setFiles] = useState<DisplayFile[]>([])
    const { getFiles } = useContext(DropboxContext) as DropboxContextType

    useEffect(() => {

        const rawFiles = getFiles(id)
        const urls: string[] = []

        setFiles((prevState) => {
            return rawFiles?.map((file) => {
                const parsedFile: DisplayFile = {
                    id: id,
                    name: file.name,
                    url : ''
                }
    
                if (file.type.startsWith('image')) {
                    parsedFile.url = URL.createObjectURL(file)
                    urls.push(parsedFile.url)
                }
    
                return parsedFile
            }) || []
        })

        return () => {
            urls.forEach((url) => {
                URL.revokeObjectURL(url)
            })
        }

    }, [getFiles, id])

    return (
        <section
            className="grid gap-2 grid-cols-2"
        >
            { files?.map((file, index) => (
                <div
                    className="relative flex flex-col justify-center items-center h-[300px] border border-slate-100 rounded overflow-hidden"
                >
                    { file.url ? (
                        <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <>
                            <File
                                size="3rem"
                                className="text-primary"
                            />
                            <p className="line-clamp-1 text-center">
                                { file.name }
                            </p>
                        </>
                    ) }

                    { typeof onDelete == 'function' ? (
                        <div
                            className="bg-primary text-white absolute top-0 end-0 p-1 border border-primary rounded-full cursor-pointer"
                            onClick={() => onDelete(index)}
                        >
                            <Plus size={24} className="rotate-45"/>
                        </div>
                    ) : (<></>) }
                </div>
            )) }
            { multiple ? (
                <div
                    className="relative flex flex-col justify-center items-center border border-slate-100 rounded cursor-pointer"
                    onClick={onAdd}
                >
                    <Plus size={24}/>
                    Add new image
                </div>
            ) : (<></>) }
        </section>
    )
}

const DropboxEmptyBanner : FC<DropboxEmptyBannerProps> = ({
    multiple = false,
    onClick
}) => (
    <div
        className="flex flex-col items-center justify-center p-8"
    >
        <p className="mb-4"><strong>DROP YOUR { multiple ? 'FILES' : 'FILE' } HERE</strong></p>
        <Button type="button" onClick={onClick}>BROWSE</Button>
    </div>
)

const DropOverlay : FC<DropOverlayProps> = ({
    active = false,
    multiple = false
}) => (
    <div 
        className={`${
            "flex flex-col items-center justify-center absolute inset-0 bg-white text-center transition-transform"
        } ${
            active ? "translate-y-0" : "translate-y-full"
        }`}
    >
        <strong>DROP TO UPLOAD</strong>
        <Upload size={64} className="text-primary"/>
    </div>
)
