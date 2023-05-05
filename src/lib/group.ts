import type { Session } from "./session";

export class AddFriendRequest {
    session: Session;
    friend_id: number;
    constructor(session: Session, friend_id: number) {
        this.session = session;
        this.friend_id = friend_id;
    }
}

export class Group {
    group_id: string;
    group_name: string;
    constructor(user_id: string, user_name: string) {
        this.group_id = user_id;
        this.group_name = user_name;
    }
}

export class AddGroupRequest {
    session: Session;
    group_id: number;
    constructor(session: Session, group_id: number) {
        this.session = session;
        this.group_id = group_id;
    }
}

function sync_group_list(){

}

function sync_group_user(){
    
}