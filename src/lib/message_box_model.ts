import type { AvatarColor } from "./avatar_vars";

export class Message {
    user_id: string;
    user_name: string;
    avatar_color: AvatarColor;
    message_text: string;
    constructor(user_id: string, user_name: string, msg_text: string, avatar_color: AvatarColor) {
        this.user_id = user_id;
        this.avatar_color = avatar_color;
        this.message_text = msg_text;
        this.user_name = user_name;
    }
}
