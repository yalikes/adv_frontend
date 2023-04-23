<script lang="ts">
import { AvatarColor } from "../lib/avatar_vars";
import { Message } from "../lib/message_box_model";
import InputBox from "./InputBox.svelte";
import MessageBox from "./MessageBox.svelte";
    let msg_list = [
        new Message("1", "paohui", "hello, world!", AvatarColor.BLUE),
        new Message("2", "yalikes", "hello!", AvatarColor.GREEN),
        new Message("3", "qyt", "测试测试!", AvatarColor.ORANGE),
    ];
    function input_message_done(event: CustomEvent<{ result: string }>) {
        console.log(event.detail.result);
    }
</script>

<div
    class="grid grid-rows-[minmax(400px,_1fr)_3rem_0.5rem] bg-[--nav-border-gray]"
>
    <div class="overflow-auto p-2 m-0">
        {#each msg_list as msg}
        <MessageBox msg={msg}></MessageBox>
	    {/each}
        </div>
    <div class="px-4">
        <InputBox on:done={input_message_done} />
    </div>
    <div />
</div>
