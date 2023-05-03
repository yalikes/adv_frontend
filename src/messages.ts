import type { Message } from '$lib/message_box_model';
import { fetch_post_json } from '$lib/my_fetch';
import type { Session } from '$lib/session';
import { writable, type Writable } from 'svelte/store';
class MessagePlain {
    user_id: number;
    content: string;
    constructor(user_id: number,
        content: string,
    ) {
        this.user_id = user_id;
        this.content = content;
    }
}

enum MessageType {
    Private = "Private",
    Group = "Group",
}

export class ChatMessageRequest {
    message_type: MessageType;
    content: string;
    reciver_id: number;
    seesion: Session;
    constructor(message_type: MessageType, content: string, reciver_id: number, seesion: Session
    ) {
        this.message_type = message_type;
        this.content = content;
        this.reciver_id = reciver_id;
        this.seesion = seesion;
    }
}

export const group_message_map: Writable<Map<number, Message[]>> = writable();
export const private_message_map: Writable<Map<number, Message[]>> = writable();

export function send_private_message(message: ChatMessageRequest) {
    fetch_post_json("/message", JSON.stringify(
        message
    ));
}
export { MessageType };