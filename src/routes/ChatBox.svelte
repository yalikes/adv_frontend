<script lang="ts">
    import { afterUpdate, onDestroy } from "svelte";
    import { AvatarColor } from "../lib/avatar_vars";
    import { Message } from "../lib/message_box_model";
    import Avatar from "./Avatar.svelte";
    import InputBox from "./InputBox.svelte";
    import MessageBox from "./MessageBox.svelte";
    import { User } from "$lib/user";
    import { message_list } from "../messages";

    let chat_box: Element;

    export let this_user: User = new User("1", "algebnaly");

    let msg_list: Message[] = [];

    const unsubscribe = message_list.subscribe((m_list) => {
        msg_list = m_list;
    });

    function input_message_done(event: CustomEvent<{ result: string }>) {
        message_list.update((m_list) => {
            m_list.push(new Message(this_user, event.detail.result));
            return m_list;
        });
    }
    // svelte 官方例子
    const scrollToBottom = async (node: Element) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };
    afterUpdate(() => {
        scrollToBottom(chat_box);
    });
    onDestroy(unsubscribe);
</script>

<div
    class="grid grid-rows-[minmax(400px,_1fr)_3rem_0.5rem] bg-[--nav-border-gray] h-screen"
>
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
