<script lang="ts">
    import { afterUpdate, onDestroy } from "svelte";
    import { AvatarColor } from "../lib/avatar_vars";
    import type { Message } from "../lib/message_box_model";
    import Avatar from "./Avatar.svelte";
    import InputBox from "./InputBox.svelte";
    import MessageBox from "./MessageBox.svelte";
    import type { User } from "$lib/user";
    import { ChatMessageRequest, MessageType, group_message_map, private_message_map, send_private_message } from "../messages";
    import { onMount } from "svelte";
    import { Result } from "postcss";
    import type { Session } from "$lib/session";


    let chat_box: Element;
    let current_gp_num: number;

    export let this_user: User;
    export let is_in_group: boolean;
    export let session: Session;

    let msg_list: Message[] = [];
    let group_list: number[] = [11, 12, 13];
    let private_list: number[] = [100000,2,3];
    let select_list: number[] = [];

    const unsubscribe_group_message = group_message_map.subscribe((m_list) => {
        // msg_list = m_list;
    });
    const unsubscribe_private_message = private_message_map.subscribe(
        (m_list) => {
            // msg_list = m_list;
        }
    );

    function input_message_done(event: CustomEvent<{ result: string }>) {
        if(is_in_group){
            send_private_message(new ChatMessageRequest(
                MessageType.Group,
                event.detail.result,
                current_gp_num,
                session
            ));
        }else{
            send_private_message(new ChatMessageRequest(
                MessageType.Private,
                event.detail.result,
                current_gp_num,
                session
            ));
        }
        // message_list.update((m_list) => {
        //     m_list.push(new Message(this_user, event.detail.result));
        //     return m_list;
        // });
    }
    // svelte 官方例子
    const scrollToBottom = async (node: Element) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };
    afterUpdate(() => {
        scrollToBottom(chat_box);
    });
    onDestroy(() => {
        unsubscribe_group_message();
        unsubscribe_private_message();
    });
    onMount(()=>{
        if(is_in_group){
            select_list = group_list;
        }else{
            select_list = private_list;
        }
        if (select_list){
            current_gp_num = select_list[0];
        }
    });
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
        >
            {#each select_list as num}
                <option value={num}>
                    {num}
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
