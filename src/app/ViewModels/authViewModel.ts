export interface AuthViewModel {
    message:string,
    username:string,
    isAuthenticated:Boolean,
    email :string,
    roles:string[],
    token:string,
    expiresOn:Date
}

