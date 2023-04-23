<script lang="ts">
    import type { Message } from "../lib/message_box_model";
    import Avatar from "./Avatar.svelte";

    export let msg: Message;
</script>

<div
    class="grid grid-cols-[3rem_minmax(4rem,_1fr)]
    bg-gray-700 hover:bg-gray-600
    p-1 rounded-xl m-2"
>
    <Avatar bg={msg.user.avatar_color}/>
    <div class="grid grid-rows-[1rem_minmax(2rem,_1fr)]">
        <div class="text-green-400 m-0 hover:underline">
            <div>{msg.user.user_name}</div>
        </div>

        <div class="text-white py-1">{msg.message_text}</div>
    </div>
</div>
