import type { Session } from "./session";

export class UserLoginRequest{
    user_id: number;
    password: string;
    constructor(user_id: number, password: string){
        this.user_id=user_id;
        this.password = password;
    }
}
export interface UserLoginInfo{
    state: string,
    session_info: Session
}