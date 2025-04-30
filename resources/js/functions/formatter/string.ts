export const toTitleCase = (string: string) => {
    return string.split(' ')
        .map((part) => `${part[0].toUpperCase()}${part.substring(1)}`)
        .join(' ')
}