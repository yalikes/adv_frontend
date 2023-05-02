import { writable, type Writable } from "svelte/store";
import { AvatarColor } from "./avatar_vars";
import { SERVER_URL } from "./constants";
import { fetch_post_json } from "./my_fetch";
import type { Session } from "./session";

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

class UserFriendsRequest {
    session: Session;
    constructor(session: Session) {
        this.session = session;
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
export const friends_list: User[] = [];
export const this_user: Writable<User | null> = writable(null);

export function sync_friends_list(session: Session) {
    let user = fetch_post_json("/user/friends", JSON.stringify(
        new UserFriendsRequest(session)
    )).then((obj) => {
        if (obj["state"] == "Ok") {
            let user = <User[]>obj["info"];

        }
    });
}