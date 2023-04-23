<script lang="ts">
    import { afterUpdate } from "svelte";
    import { AvatarColor } from "../lib/avatar_vars";
    import { Message } from "../lib/message_box_model";
    import Avatar from "./Avatar.svelte";
    import InputBox from "./InputBox.svelte";
    import MessageBox from "./MessageBox.svelte";
    import { User } from "$lib/user";

    let chat_box: Element;

    let this_user: User = new User("1", "algebnaly");

    let msg_list: Message[] = [];
    function input_message_done(event: CustomEvent<{ result: string }>) {
        msg_list.push(new Message(this_user, event.detail.result));
        msg_list = msg_list;
    }
    // svelte 官方例子
    const scrollToBottom = async (node: Element) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };
    afterUpdate(() => {
        scrollToBottom(chat_box);
    });
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
