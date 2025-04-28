export type PageProps<T extends Record<string, any> = Record<string, unknown>> = T & {
    csrf_token      : string
}