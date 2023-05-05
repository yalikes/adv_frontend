<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher<{ done: { result: string } }>();
    export let item_name: string;
    export let button_name: string;
    export let info: string;
    let input_val: string;
    function click_button() {
        if (input_val) {
            //dispatch if input string length greater than 0
            dispatch("done", {
                result: input_val,
            });
        }
    }
</script>

<div class="w-full flex flex-row justify-center p-2 text-xl">
    <div class="h-12 grid grid-cols-[12rem_8rem_18rem_6rem]">
        <div class="w-full h-full p-1 flex flex-row justify-center">
            <label for="info" class="text-center w-full self-center"
                >{info}</label
            >
        </div>
        <div class="w-full h-full p-1 flex flex-row justify-center">
            <label for={item_name} class="text-center w-full self-center"
                >{item_name}</label
            >
        </div>
        <div class="w-full h-full p-1">
            <input
                class=" w-full h-full bg-[--input-bg-gray] rounded-sm text-center"
                bind:value={input_val}
            />
        </div>
        <div class="w-full h-full p-1">
            <button
                class=" bg-purple-600 h-full w-full rounded-sm text-white"
                on:click={click_button}
            >
                {button_name}
            </button>
        </div>
    </div>
</div>
