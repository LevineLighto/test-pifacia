export const containerClasses = {
    display : 'grid',
    gap     : 'gap-2',
    padding : 'pb-4',
}

export const inputWrapperClasses = {
    display : 'inline-grid',
    grid    : 'grid-cols-1',
    margin  : 'mr-2',
}

export const inputClasses = {
    appearance  : 'appearance-none',
    background  : 'bg-white hover:not-checked:bg-slate-200 checked:bg-primary disabled:bg-slate-100',
    border      : 'border border-slate-300 hover:not-checked:border-slate-400 checked:border-primary disabled:border-slate-100',
    borderRadius: 'rounded',
    display     : 'block',
    grid        : 'col-start-1 col-end-1 row-start-1 row-end-1',
    height      : 'h-[1rem]',
    peer        : 'peer',
    width       : 'w-[1rem]',
}

export const iconClasses = {
    color       : 'text-white',
    display     : 'hidden peer-checked:block',
    event       : 'pointer-events-none',
    grid        : 'col-start-1 col-end-1 row-start-1 row-end-1 justify-self-center self-center',
}

export const labelClasses = {
    color   : 'text-slate-900',
    display : 'inline-block',
}

export const requiredClasses = {
    color : 'text-primary'
}