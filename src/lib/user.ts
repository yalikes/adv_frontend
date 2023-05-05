import { writable, type Writable } from "svelte/store";
import { AvatarColor } from "./avatar_vars";
import { SERVER_URL } from "./constants";
import { fetch_post_json } from "./my_fetch";
import type { Session } from "./session";
import type { Group } from "./group";

export class User {
    user_id: string;
    user_name: string;
    avatar: AvatarColor;
    constructor(user_id: string, user_name: string, avatar_color: AvatarColor = AvatarColor.BLUE) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.avatar = avatar_color;
    }
}
class UserLoginRequest {
    session: Session;
    constructor(session: Session) {
        this.session = session;
    }
}

export class UserRegisterRequest {
    username: string;
    password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export class UserRegisterResultInfo {
    state: string;
    session_info: Session;
    user_id: number;
    constructor(state: string,
        session_info: Session,
        user_id: number,
    ) {
        this.state = state;
        this.session_info = session_info;
        this.user_id = user_id;
    }
}

export class UserFriendsRequest {
    session: Session;
    constructor(session: Session) {
        this.session = session;
    }
}

export class AddFriendRequest {
    session: Session;
    friend_id: number;
    constructor(session: Session, friend_id: number) {
        this.session = session;
        this.friend_id = friend_id;
    }
}

export function get_user_info(session: Session): Promise<User | null> {
    let user = fetch_post_json("/user/info", JSON.stringify(
        new UserLoginRequest(session)
    )).then((obj) => {
        if (obj["state"] == "Ok") {
            let user = <User>obj["info"];
            return new User(user.user_id, user.user_name, user.avatar);
        } else {
            return null;
        }
    });
    return user;
}

class AppState {
    friend_list: User[] = [];
    this_user: User | null = null;
    this_session: Session | null = null;
    users_map: Map<number, User> = new Map();
    group_map: Map<number, Group> = new Map();
}
export const this_app = new AppState();

export function sync_friends_list(session: Session) {
    let friends_promise = fetch_post_json("/user/friends", JSON.stringify(
        new UserFriendsRequest(session)
    )).then((obj) => {
        if (obj["state"] == "Ok") {
            let users = <User[]>obj["info"]["friends"];
            users.forEach((u) => {
                let user = new User(
                    u.user_id,
                    u.user_name,
                    u.avatar
                );
                this_app.users_map.set(parseInt(user.user_id), user);
            });
            this_app.friend_list = users;
        }
        return this_app.friend_list;
    });
    return friends_promise;
}