export interface CustomerInterface {
    id?: number,
    name?: string,
    address?: string,
    pic?: string,
    phone?: string,
    email?: string,
    status?: number,
    created_at?: Date,
    updated_at?: Date,
}

export interface CustomerInputInterface {
    name: string,
    address: string,
    pic?: string,
    phone?: string,
    email?: string,
}

export interface CustomerUpdateInterface {
    name?: string,
    address?: string,
    pic?: string,
    phone?: string,
    email?: string,
}