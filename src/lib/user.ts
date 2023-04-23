import { AvatarColor } from "./avatar_vars";

export class User {
    user_id: string;
    user_name: string;
    avatar_color: AvatarColor;
    constructor(user_id: string, user_name: string, avatar_color: AvatarColor = AvatarColor.BLUE) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.avatar_color = avatar_color;
    }
}