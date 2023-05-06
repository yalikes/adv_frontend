import type { MessageType } from "../messages";
import type { AvatarColor } from "./avatar_vars";
import type { User } from "./user";

export class Message {
    type: MessageType;
    user: User;
    message_text: string;
    group_id: number;
    constructor(type: MessageType, user: User, group_id: number, msg_text: string) {
        this.type = type;
        this.user = user;
        this.group_id = group_id;
        this.message_text = msg_text;
    }
}
