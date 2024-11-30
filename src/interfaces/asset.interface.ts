export interface AssetInterface {
    id?: number
    name?: string
    type?: string
    code?: string
    condition?: "GOOD" | "BAD" | "REPAIR"
    status?: "READY" | "QC" | "REPAIR"
    created_at?: Date
    updated_at?: Date
}