import { fetch_post_json } from "./my_fetch";
import type { Session } from "./session";
import { User, this_app } from "./user";

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

export class UserGroupsRequest {
    session: Session;
    constructor(session: Session) {
        this.session = session;
    }
}
export class GroupUsersRequest {
    group_id: number
    constructor(group_id: number) {
        this.group_id = group_id;
    }
}

class GroupUsersInfo {
    users: User[];
    constructor(users: User[]) {
        this.users = users;
    }
}
class UserGroupsInfo {
    groups: Group[];
    constructor(groups: Group[]) {
        this.groups = groups;
    }
}

function sync_group_list() {
    fetch_post_json("/user/groups", JSON.stringify(
        new UserGroupsRequest(<Session>this_app.this_session)
    )).then((obj) => {
        // groups = 
    });
}

function sync_group_user(group_id: number) {
    fetch_post_json("/group/users", JSON.stringify(
        new GroupUsersRequest(group_id)
    )).then((obj) => {

    });
}