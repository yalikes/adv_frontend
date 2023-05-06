<script lang="ts">
    import { NavChoose } from "$lib/nav_choose";
    import {
        get_this_user_info,
        sync_friends_list,
        this_app,
        User,
    } from "$lib/user";
    import { onMount } from "svelte";
    import ChatBox from "./ChatBox.svelte";
    import Setting from "./Setting.svelte";
    import SideBar from "./SideBar.svelte";
    import { goto } from "$app/navigation";
    import { Session } from "$lib/session";
    import { fetch_post_json } from "$lib/my_fetch";
    import { add_message, MessagePlain, MessageType } from "../messages";
    import { Group } from "$lib/group";
    import { Message } from "$lib/message_box_model";
    const BACKEND_SERVER = "backend.org:3000";

    let current_box = NavChoose.GroupMessage;
    let session_ref: Session;
    let child: ChatBox;
    let is_in_group = true;
    function handle_choose(e: CustomEvent<{ result: NavChoose }>) {
        current_box = e.detail.result;
        if (current_box == NavChoose.GroupMessage) {
            is_in_group = true;
        } else if (current_box == NavChoose.PrivateMessage) {
            is_in_group = false;
        }
    }
    onMount(() => {
        let session_id = localStorage.getItem("session");
        if (!session_id) {
            goto("/login");
        }
        this_app.this_session = new Session(session_id as string);
        session_ref = this_app.this_session;
        get_this_user_info(this_app.this_session).then((user) => {
            if (user) {
                this_app.this_user = user;
            } else {
                goto("/login");
            }
        });
        sync_friends_list(this_app.this_session);
        child.set_session(this_app.this_session);
        let socket = new WebSocket("ws://" + BACKEND_SERVER + "/tunnel");

        socket.addEventListener("open", (event) => {
            socket.send(JSON.stringify(this_app.this_session)); //authorized token
        });

        socket.addEventListener("message", (event: MessageEvent<string>) => {
            let msg_obj = JSON.parse(event.data);
            let msg_type: MessageType;
            let user_id: number;
            if (msg_obj["message_type"] == "Group") {
                msg_type = MessageType.Group;
            } else {
                msg_type = MessageType.Private;
            }
            user_id = msg_obj["user_id"];
            let msg_plain = new MessagePlain(
                msg_type,
                user_id,
                msg_obj["content"]
            );
            add_message(msg_plain);
        });
    });
</script>

<div class="grid grid-cols-[4rem_minmax(400px,_1fr)]">
    <SideBar on:choose={handle_choose} />
    {#if current_box == NavChoose.GroupMessage}
        <ChatBox {is_in_group} session={session_ref} bind:this={child} />
    {/if}
    {#if current_box == NavChoose.PrivateMessage}
        <ChatBox {is_in_group} session={session_ref} bind:this={child} />
    {/if}
    {#if current_box == NavChoose.Setting}
        <Setting />
    {/if}
</div>

<style lang="postcss">
</style>
