export interface UserInterface {
    id?: number,
    name?: string,
    username?: string,
    password?: string,
    email?: string,
    status?: number,
    profile_picture?: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface UserInputInterface {
    name: string,
    username: string,
    password: string,
    confirm_password: string,
    email: string,
    profile_picture: string,
}

export interface UserUpdateInputInterface {
    name?: string,
    username?: string,
    email?: string,
    profile_picture?: string,
}

export interface UserLoginInterface {
    username: string,
    password: string
}