import type { AvatarColor } from "./avatar_vars";
import type { User } from "./user";

export class Message {
    user: User;
    message_text: string;
    constructor(user: User, msg_text: string) {
        this.user = user;
        this.message_text = msg_text;
    }
}
