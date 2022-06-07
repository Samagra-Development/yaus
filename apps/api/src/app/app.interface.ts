export interface Link {
    id?: string
    user?: string | null
    tags?: Array<string>
    clicks?: number
    url?: string | null
    hashid?: number
    project?: string | null
    customHashId?: string | null
}
