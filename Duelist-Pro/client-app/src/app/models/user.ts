export interface User 
{
    displayName: string,
    token: string,
    userName: string,
    image?:	string
}

export interface UserFormValues 
{
    displayName?: string,
    email: string,
    password: string,
    userName: string
}