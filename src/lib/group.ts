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
    state: string;
    groups: Group[];
    constructor(state: string, groups: Group[]) {
        this.state = state;
        this.groups = groups;
    }
}

export class NewGroupRequest {
    session: Session;
    group_name: string;
    constructor(session: Session, group_name: string) {
        this.session = session;
        this.group_name = group_name;
    }
}

export interface NewGroupRespone {
    state: string,
    group_id: number,
}

export function sync_group_list(session: Session) {
    fetch_post_json("/user/groups", JSON.stringify(
        new UserGroupsRequest(session)
    )).then((obj) => {
        let user_groups = <UserGroupsInfo>obj;
        if (user_groups.state == "Ok") {
            this_app.group_list.length = 0;
            user_groups.groups.forEach((g) => {
                let new_g = new Group(g.group_id, g.group_name);
                this_app.group_list.push(new_g);
            });
        }
    });
}

function sync_group_user(group_id: number) {
    fetch_post_json("/group/users", JSON.stringify(
        new GroupUsersRequest(group_id)
    )).then((obj) => {

    });
}