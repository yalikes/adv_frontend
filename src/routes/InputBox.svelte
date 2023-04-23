<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher<{done: {result: string}}>();
    let text = "";

    function input_done() {
        if (text == "") {
            return;
        }
        let result = text;
        text = "";
        dispatch("done", { result });
    }
    function check_enter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            input_done();
        }
    }
</script>

<div
    class="bg-[--input-bg-gray] h-full rounded-xl grid grid-cols-[minmax(400px,_1fr)_6rem]"
>
    <input
        on:keydown={check_enter}
        placeholder="Type message Here"
        class="px-2 bg-[--input-bg-gray] rounded-2xl m-0
        text-white overflow-auto
        w-full h-full focus-visible:outline-none"
        bind:value={text}
    />

    <button
        class=" bg-sky-500 mx-2
        rounded-2xl hover:bg-sky-400
        transition-all active:translate-y-1"
        on:click={input_done}>发送</button
    >
</div>
