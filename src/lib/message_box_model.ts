import type { MessageType } from "../messages";
import type { AvatarColor } from "./avatar_vars";
import type { User } from "./user";

export class Message {
    type: MessageType;
    user: User;
    message_text: string;
    constructor(type: MessageType, user: User, msg_text: string) {
        this.type = type;
        this.user = user;
        this.message_text = msg_text;
    }
}
