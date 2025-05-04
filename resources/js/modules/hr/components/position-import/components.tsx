import { FC, ReactEventHandler, useContext, useEffect, useRef, useState } from "react";
import { PositionImportProps } from "./props";
import { Dropbox, DropboxContext, DropboxContextType, InputChangeHandler, SearchableSelect } from "@/components/inputs";
import { Form } from "@/components/forms";
import { Button } from "@/components/buttons";
import { PositionImportRequest, ImportUploadRequest } from "@/hr/types";
import { ImportPosition, UploadImportPosition } from "@/hr/functions/requests";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "react-toastify";
import { X } from "react-feather";
import { POSITIONS_GROUP_CREATE } from "@/constants/permissions";
import { useHasPermission } from "@/hooks/permission";

export const PositionImport : FC<PositionImportProps> = ({
    open,
    onClose
}) => {
    const canCreate = useHasPermission(POSITIONS_GROUP_CREATE)

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<'upload' | 'select'>('upload')
    const dialogRef = useRef<HTMLDialogElement>(null)

    const { reset: dropboxReset } = useContext(DropboxContext) as DropboxContextType
    const dropboxId = "upload-import"

    const { props } = usePage<PageProps>()

    const [ columns, setColumns ] = useState<{id: string, label: string}[]>([])

    const [uploadForm, setUploadForm] = useState<ImportUploadRequest>({
        file: []
    })

    const [importForm, setImportForm] = useState<PositionImportRequest>({
        file: '',
        headings: {
            name        : '',
            code        : '',
            scope       : '',
            is_active   : '',
            division    : ''
        }
    })

    const reset = () => {
        setStep('upload')
        dropboxReset(dropboxId)
        setColumns([])
        setUploadForm({ file: [] })
        setImportForm({
            file: '',
            headings: {
                name        : '',
                code        : '',
                scope       : '',
                is_active   : '',
                division    : '',
            }
        })
    }

    const handleClose : ReactEventHandler<HTMLDialogElement> = (event) => {

        if (loading) {
            event.preventDefault()
            return
        }

        reset()

        if (typeof onClose == 'function') {
            onClose()
        }

    }

    const handleUploadChange : InputChangeHandler = ({name, value}) => {
        setUploadForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleImportChange : InputChangeHandler = ({name, value}) => {
        setImportForm((prevState) => ({
            ...prevState,
            headings : {
                ...prevState.headings,
                [name]: value
            }
        }))
    }

    const handleUpload = () => {
        if (loading || !uploadForm.file.length) {
            return
        }

        setLoading(true)

        const form = new FormData
        form.append('file', uploadForm.file[0])

        UploadImportPosition(form, props.csrf_token)
            .then(response => {
                if (response.status.code != 200) {
                    return
                }

                setColumns(response.data?.headings.map((heading) => ({
                    id      : heading,
                    label   : heading
                })) || [])

                setImportForm((prevState) => ({
                    ...prevState,
                    file: response.data?.file || ''
                }))

                dropboxReset(dropboxId)
                setStep('select')
            })
            .finally(() => { setLoading(false) })
    }

    const handleImport = () => {
        if (loading) {
            return
        }

        setLoading(true)

        ImportPosition(importForm, props.csrf_token)
            .then(response => {
                if (response.status.code != 200) {
                    return
                }

                toast.success('Successfully queued your import request. Please wait for a while')
                dialogRef.current?.close()
            })
            .finally(() => { setLoading(false) })
    }

    useEffect(() => {
        if (!dialogRef.current) {
            return
        }

        if (!open) {
            dialogRef.current.close()
        } else {
            dialogRef.current.showModal()
        }
    }, [open])

    if (!canCreate) {
        return (
            <></>
        )
    }

    return (
        <dialog
            className="bg-white rounded-lg p-8 top-1/2 left-1/2 -translate-1/2 min-w-[320px] md:min-w-[640px]"
            onClose={handleClose}
            ref={dialogRef}
        >
            <header className="pb-2 mb-6 border-b border-b-slate-200 flex justify-between">
                <h3 className="varela-round text-2xl">Import Position</h3>
                <X
                    strokeWidth={4}
                    className={`${
                        !loading ? "cursor-pointer text-slate-400 hover:text-slate-700" : "text-slate-100"
                    }`}
                    onClick={!loading ? () => dialogRef.current?.close() : undefined }
                    size="1.75rem"
                />
            </header>
            { loading ? (
                <p className="text-xl">
                    Processing...
                </p>
            ) : step == 'upload' ? (
                <Form 
                    className="grid gap-3"
                    onSubmit={handleUpload}
                >
                    <Dropbox
                        id={dropboxId}
                        name="file"
                        onChange={handleUploadChange}
                    />
                    <Button
                        type="submit"
                        disabled={loading || !uploadForm.file.length}
                    >
                        Upload
                    </Button>
                </Form>
            ) : (
                <Form
                    className="grid-gap-3"
                    onSubmit={handleImport}
                >
                    <SearchableSelect 
                        data={columns}
                        itemLabelKey="label"
                        required
                        label="Name Column"
                        name="name"
                        value={importForm.headings.name}
                        onChange={handleImportChange}
                    />
                    <SearchableSelect 
                        data={columns}
                        itemLabelKey="label"
                        required
                        label="Code Column"
                        name="code"
                        value={importForm.headings.code}
                        onChange={handleImportChange}
                    />
                    <SearchableSelect 
                        data={columns}
                        itemLabelKey="label"
                        required
                        label="Active Status Column"
                        name="is_active"
                        value={importForm.headings.is_active}
                        onChange={handleImportChange}
                    />
                    <SearchableSelect 
                        data={columns}
                        itemLabelKey="label"
                        required
                        label="Division Column"
                        name="division"
                        value={importForm.headings.division}
                        onChange={handleImportChange}
                    />
                    <SearchableSelect 
                        data={columns}
                        itemLabelKey="label"
                        required
                        label="Scopes Column"
                        name="scope"
                        value={importForm.headings.scope}
                        onChange={handleImportChange}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        Submit
                    </Button>
                </Form>
            ) }
        </dialog>
    )
}