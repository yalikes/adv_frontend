<script lang="ts">
    import { afterUpdate, onDestroy } from "svelte";
    import { AvatarColor } from "../lib/avatar_vars";
    import { Message } from "../lib/message_box_model";
    import Avatar from "./Avatar.svelte";
    import InputBox from "./InputBox.svelte";
    import MessageBox from "./MessageBox.svelte";
    import { sync_friends_list, this_app, type User } from "$lib/user";
    import {
        ChatMessageRequest,
        MessageType,
        group_message_notifer,
        group_msg_map,
        private_message_notifer,
        private_msg_map,
        send_message,
    } from "../messages";
    import { onMount } from "svelte";
    import { Result } from "postcss";
    import type { Session } from "$lib/session";
    import { Group, sync_group_list } from "$lib/group";

    let chat_box: Element;
    let current_gp_num: number;

    export let is_in_group: boolean;
    export let session: Session;

    let msg_list: Message[] = [];
    let select_list: number[] = [];

    let current_name: string = "";

    function refresh_msg_list() {
        if (is_in_group) {
            let p_msg_list_temp = group_msg_map.get(current_gp_num);
            msg_list = [];
            if (p_msg_list_temp) {
                msg_list = p_msg_list_temp;
            }
        } else {
            let p_msg_list_temp = private_msg_map.get(current_gp_num);
            msg_list = [];
            if (p_msg_list_temp) {
                msg_list = p_msg_list_temp;
            }
        }
        set_current_name();
    }
    function get_item_name(num: number): string {
        if (is_in_group) {
            let item_group = <Group>this_app.group_map.get(num);
            return item_group.group_name;
        } else {
            let item_user = <User>this_app.users_map.get(num);
            return item_user.user_name;
        }
    }

    const unsubscribe_group_notifer = group_message_notifer.subscribe((_) => {
        console.log("group notifity");
        console.log(is_in_group, current_gp_num);
        if (is_in_group) {
            let message_list_temp = group_msg_map.get(current_gp_num);
            msg_list = [];
            if (message_list_temp) {
                msg_list = message_list_temp;
            }
        }
    });
    const unsubscribe_private_notifer = private_message_notifer.subscribe(
        (_) => {
            console.log("private notifity");
            if (!is_in_group) {
                let message_list_temp = private_msg_map.get(current_gp_num);
                msg_list = [];
                if (message_list_temp) {
                    msg_list = message_list_temp;
                }
            }
        }
    );

    function set_current_name() {
        if (is_in_group) {
            let current_group = <Group>this_app.group_map.get(current_gp_num);
            current_name = current_group.group_name;
        } else {
            let current_user = <User>this_app.users_map.get(current_gp_num);
            current_name = current_user.user_name;
        }
    }

    function input_message_done(event: CustomEvent<{ result: string }>) {
        if (is_in_group) {
            send_message(
                new ChatMessageRequest(
                    MessageType.Group,
                    event.detail.result,
                    current_gp_num,
                    session
                )
            ).then((obj) => {
                if (obj["state"] == "Ok") {
                }
            });
        } else {
            let current_gp_num_temp = current_gp_num;
            send_message(
                new ChatMessageRequest(
                    MessageType.Private,
                    event.detail.result,
                    current_gp_num_temp,
                    session
                )
            ).then((obj) => {
                if (obj["state"] == "Ok") {
                    let p_msg_list_temp =
                        private_msg_map.get(current_gp_num_temp);
                    if (!p_msg_list_temp) {
                        p_msg_list_temp = [];
                    }
                    p_msg_list_temp.push(
                        new Message(
                            MessageType.Private,
                            <User>this_app.this_user,
                            0,
                            event.detail.result
                        )
                    );
                    private_msg_map.set(current_gp_num_temp, p_msg_list_temp);
                    msg_list = p_msg_list_temp;
                }
            });
        }
    }
    // svelte 官方例子
    const scrollToBottom = async (node: Element) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };
    afterUpdate(() => {
        scrollToBottom(chat_box);
    });
    onDestroy(() => {
        unsubscribe_group_notifer();
        unsubscribe_private_notifer();
    });
    onMount(() => {
        if (this_app.this_session) {
            set_session(this_app.this_session);
        }
    });
    export function set_session(session: Session) {
        if (is_in_group) {
            let group_list = sync_group_list(session);
            group_list.then((g_list) => {
                let g_num_list = g_list.map((g) => g.group_id);
                select_list = g_num_list;
                if (select_list.length) {
                    current_gp_num = select_list[0];
                    set_current_name();
                    refresh_msg_list();
                }
            });
        } else {
            let friend_list = sync_friends_list(session);
            friend_list.then((friend_list) => {
                let private_list = (<User[]>friend_list).map((u) => u.user_id);
                select_list = private_list;
                if (select_list.length) {
                    current_gp_num = select_list[0];
                    set_current_name();
                    refresh_msg_list();
                }
            });
        }
    }
</script>

<div
    class="grid grid-rows-[2rem_minmax(400px,_1fr)_3rem_0.5rem] bg-[--nav-border-gray] h-screen"
>
    <div class="flex flex-row justify-center text-white">
        <select
            class=" w-1/4 bg-[--nav-border-gray]"
            name="select_group"
            id="select_group"
            bind:value={current_gp_num}
            on:change={refresh_msg_list}
        >
            {#each select_list as num}
                <option value={num}>
                    {get_item_name(num)}({num})
                </option>
            {/each}
        </select>
    </div>
    <div
        bind:this={chat_box}
        class="overflow-auto p-2 m-0 h-full custom-scrollbar"
    >
        {#each msg_list as msg}
            <MessageBox {msg} />
        {/each}
    </div>
    <div class="px-4">
        <InputBox on:done={input_message_done} />
    </div>
    <div />
</div>
