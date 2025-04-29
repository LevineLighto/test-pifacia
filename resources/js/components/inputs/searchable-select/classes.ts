export const containerClasses = {
    display : 'grid',
    gap     : 'gap-2',
    padding : 'pb-4',
}

export const wrapperClasses = {
    appearance: 'appearance-none',
    background: {
        normal  : 'bg-white',
        disabled: 'bg-slate-100',
    },
    border: {
        default : 'border',
        focused : 'border-primary',
        normal  : 'border-slate-300 hover:border-slate-500',
        disabled: 'border-slate-100',
    },
    borderRadius: 'rounded',
    color       : 'text-slate-900',
    display     : 'flex',
    maxWidth    : 'max-w-full',
    outline     : '!outline-0',
    padding     : 'px-3 py-2',
    position    : 'relative',
    width       : 'w-full',
}

export const inputWrapperClasses = {
    cursor  : 'cursor-text',
    display : 'flex',
    flex    : 'flex-wrap grow-1 shrink-1 basis-0',
    gap     : 'gap-1',
    minWidth: 'min-w-1',
    overflow: 'overflow-hidden',
    position: 'relative',
}

export const selectedValueClasses = {
    single: {
        display: {
            normal      : 'block',
            searching   : 'hidden'
        },
        position: 'absolute inset-0',
    },
    multiple: {
        border: 'border-r border-r-slate-300 last:border-r-0',
        display: 'inline-block',
        padding: 'px-1 py-0 first:pl-0 last:pr-0',
    }
}

export const inputClasses = {
    border  : 'border-0',
    color   : 'placeholder:text-slate-300',
    display : 'block',
    margin  : 'm-0',
    opacity : {
        empty   : 'placeholder:opacity-1',
        filled  : 'placeholder:opacity-0',
    },
    outline : 'outline-0',
    padding : 'p-0',
}

export const controlWrapperClasses = {
    display : 'flex',
    flex    : 'items-center self-stretch',
}

export const controlItemClasses = {
    border  : 'not:last:border-r not:last:border-r-slate-200',
    cursor  : 'cursor-pointer',
    color   : 'text-slate-400 hover:text-slate-500',
    padding : 'px-2 last:pr-0',
}

export const dropdownClasses = {
    background  : 'bg-white',
    borderRadius: 'rounded',
    boxShadow   : 'shadow',
    display     : {
        closed  : 'hidden',
        open    : 'starting:block block',
    },
    maxHeight   : {
        closed  : 'max-h-0',
        open    : 'max-h-[200px]',
    },
    padding     : 'py-2',
    position    :  'absolute inset-x-0 bottom-0',
    transition  : 'transition-discrete transition-display transition-max-height',
    translate   : 'translate-y-102/100',
    zIndex      : 'z-50',
}

export const dropdownItemClasses = {
    background  : 'bg-white hover:bg-slate-100',
    cursor      : 'cursor-pointer',
    display 	: 'flex',
    flex        : 'items-center',
    gap         : 'gap-2',
    padding     : 'px-4 py-3',
}

export const labelClasses = {
    color   : 'text-slate-900',
    display : 'block',
}

export const requiredClasses = {
    color : 'text-primary'
}

export const resizerClasses = {
    height  : 'h-0',
    overflow: 'overflow-hidden',
    position: 'absolute top-0',
}