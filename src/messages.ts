import { Message } from '$lib/message_box_model';
import { fetch_post_json } from '$lib/my_fetch';
import type { Session } from '$lib/session';
import { get_user_info, this_app, User } from '$lib/user';
import { writable, type Writable } from 'svelte/store';

export class MessageExchanghe{
    message_type: MessageType;
    sender_id: number;
    receiver_id: number;
    content: string;
    time: number[];
    constructor(message_type: MessageType, sender_id: number,
        receiver_id: number,
        content: string,
        time: number[]
    ) {
        this.message_type = message_type;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.content = content;
        this.time = time;
    }
}

export class MessagePlain {
    message_type: MessageType;
    sender_id: number;
    receiver_id: number;
    content: string;
    constructor(message_type: MessageType, sender_id: number,
        receiver_id: number,
        content: string,
    ) {
        this.message_type = message_type;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
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

class SyncMessagesRequest {
    session: Session;
    days: number;
    constructor(session: Session, days: number) {
        this.session = session;
        this.days = days;
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
    console.log(message);
    if (message.message_type == MessageType.Private) {
        let user = this_app.users_map.get(message.sender_id);
        if (!user) {
            get_user_info(message.sender_id).then(
                (user) => {
                    this_app.users_map.set(message.sender_id, <User>user);
                    let msg = new Message(message.message_type, <User>user, 0, message.content);
                    add_private_message(msg);
                }
            );
        } else {
            let msg = new Message(message.message_type, <User>user, message.receiver_id, message.content);
            add_private_message(msg);
        }
    } else {
        let user = this_app.users_map.get(message.sender_id);
        if (!user) {
            get_user_info(message.sender_id).then(
                (user) => {
                    this_app.users_map.set(message.sender_id, <User>user);
                    let msg = new Message(message.message_type, <User>user, message.receiver_id, message.content);
                    add_group_message(msg);
                }
            );
        } else {
            let msg = new Message(message.message_type, <User>user, message.receiver_id, message.content);
            add_group_message(msg);
        }
    }
}

let global_count = 0;
function add_private_message(message: Message) {
    let user_id = message.user.user_id;
    let msg_list = private_msg_map.get(user_id);
    if (!msg_list) {
        msg_list = [];
    }
    msg_list.push(message);
    private_msg_map.set(user_id, msg_list);
    global_count += 1;
    private_message_notifer.set(global_count);//triger update
}

function add_group_message(message: Message) {
    let group_id = message.group_id;
    let msg_list = group_msg_map.get(group_id);
    if (!msg_list) {
        msg_list = [];
    }
    msg_list.push(message);
    group_msg_map.set(group_id, msg_list);
    console.log(msg_list);
    global_count += 1;
    group_message_notifer.set(global_count);//triger update
}

export function sync_messages(session: Session) {
    fetch_post_json("/user/message/sync", JSON.stringify(
        new SyncMessagesRequest(session, 7)
    )).then((obj) => {
        console.log(obj);
        if(obj["state"]!="Ok"){
            return;
        }
        let messages = <MessageExchanghe[]>obj["messages"];
        console.log(messages);
        messages.forEach((m)=>{
            console.log("m detail: ", m);
            console.log("m receiver_id: ",m.receiver_id);
            let new_msg = new MessagePlain(
                m.message_type,
                m.sender_id,
                m.receiver_id,
                m.content
            );
            console.log("new_msg: ", new_msg);
            add_message(new_msg);
        });
    });
}