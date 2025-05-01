import { FC, useEffect, useRef } from "react";
import { LoadingModalProps } from "./props";

export const LoadingModal : FC<LoadingModalProps> = ({open}) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (!dialogRef.current) {
            return
        }

        if (!open) {
            dialogRef.current.close()
            return
        } 

        dialogRef.current.showModal()
        const preventClose = (event: Event) => {
            event.preventDefault()
        }

        dialogRef.current.addEventListener('close', preventClose)

        return () => {
            dialogRef.current?.removeEventListener('close', preventClose)
        }

    }, [open])

    return (
        <dialog
            className="bg-white rounded-lg p-8 top-1/2 left-1/2 -translate-1/2"
            ref={dialogRef}
        >
            <p className="text-xl">
                Processing...
            </p>
        </dialog>
    )
}