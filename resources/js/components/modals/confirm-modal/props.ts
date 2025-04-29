export interface ConfirmModalProps {
    open?       : boolean
    message?    : string
    onCancel?   : () => void
    onSubmit?   : () => void
    flow?       : 'positive' | 'negative'
    loading?    : boolean
}