declare namespace API {
    export interface LoginData {
        loginType: string;
        phone?: string;
        username?: string;
        password?: string;
        message?: string;
    }
    export interface UserData {
        data?: string;
        msg?: string;
        code: string;
    }
}