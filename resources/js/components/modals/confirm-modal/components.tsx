import { FC, ReactEventHandler, useEffect, useRef } from "react";
import { ConfirmModalProps } from "./props";
import { Button } from "@/components/buttons";
import { Loader } from "react-feather";

export const ConfirmModal : FC<ConfirmModalProps> = ({
    message,
    open,
    onCancel,
    flow = 'positive',
    onSubmit,
    loading = false
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    const handleClose : ReactEventHandler<HTMLDialogElement> = (event) => {
        if (loading) {
            event.preventDefault()
            return
        }

        if (typeof onCancel == 'function') {
            onCancel()
        }
    }

    useEffect(() => {
        if (!dialogRef.current) {
            return
        }

        if (open) {
            dialogRef.current.showModal()
        } else {
            dialogRef.current.close()
        }

    }, [open])

    return (
        <dialog
            className="bg-white rounded-lg p-8 top-1/2 left-1/2 -translate-1/2"
            ref={dialogRef}
            onClose={handleClose}
        >
            <p className="mb-10 text-xl">{ message }</p>
            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant={ flow == 'negative' ? 'solid' : 'outline' }
                    onClick={onCancel}
                    className="w-full"
                    disabled={loading}
                >
                    No
                </Button>
                <Button
                    variant={ flow == 'positive' ? 'solid' : 'outline' }
                    onClick={onSubmit}
                    className="w-full"
                    disabled={loading}
                >
                    { loading ? (
                        <Loader className="inline-block me-2"/>
                    ) : (<></>) }
                    Yes
                </Button>
            </div>
        </dialog>
    )
}