import { Message } from '$lib/message_box_model';
import { fetch_post_json } from '$lib/my_fetch';
import type { Session } from '$lib/session';
import { get_user_info, this_app, User } from '$lib/user';
import { writable, type Writable } from 'svelte/store';
export class MessagePlain {
    message_type: MessageType;
    user_id: number;
    content: string;
    constructor(message_type: MessageType, user_id: number,
        content: string,
    ) {
        this.message_type = message_type;
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


export const group_message_notifer: Writable<number> = writable(0);
export const private_message_notifer: Writable<number> = writable(0);
export let private_msg_map: Map<number, Message[]> = new Map();
export let group_msg_map: Map<number, Message[]> = new Map();
export function send_message(message: ChatMessageRequest) {
    return fetch_post_json("/message", JSON.stringify(
        message
    ));
}
export { MessageType };

export function add_message(message: MessagePlain) {
    if (message.message_type == MessageType.Private) {
        let user = this_app.users_map.get(message.user_id);
        if (!user) {
            get_user_info(message.user_id).then(
                (user) => {
                    this_app.users_map.set(message.user_id, <User>user);
                    let msg = new Message(message.message_type, <User>user, message.content);
                    add_private_message(msg);
                }
            );
        } else {
            let msg = new Message(message.message_type, <User>user, message.content);
            add_private_message(msg);
        }
    }else{
                
    }
}

function add_private_message(message: Message) {
    let user_id = message.user.user_id;
    let msg_list = private_msg_map.get(user_id);
    if (!msg_list) {
        msg_list = [];
    }
    msg_list.push(message);
    private_msg_map.set(user_id, msg_list);
    private_message_notifer.set(0);//triger update
}