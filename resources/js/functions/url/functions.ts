export const base_url = (path = '') => {
    return `${window.location.origin}/${path}`
}

export const storage_url = (path = '') => {
    return base_url(`storage/${path}`)
}
