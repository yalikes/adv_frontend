<script lang="ts">
    import { NavChoose } from "$lib/nav_choose";
    import { User } from "$lib/user";
    import { onMount } from "svelte";
    import ChatBox from "./ChatBox.svelte";
    import Setting from "./Setting.svelte";
    import SideBar from "./SideBar.svelte";
    import { goto } from "$app/navigation";
    let this_user: User = new User("1", "algebnaly");
    let sesssion = "1a8239bce";

    let current_box = NavChoose.Message;
    function handle_choose(e: CustomEvent<{ result: NavChoose }>) {
        current_box = e.detail.result;
    }
    onMount(() => {
        if (!sesssion) {
            goto("/login");
        }
        fetch("http://backend.org:3000/user/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "paohui",
                password: "123",
            }),
        }).then((resp) => {
            console.log(resp);
        });
    });
</script>

<div class="grid grid-cols-[4rem_minmax(400px,_1fr)]">
    <SideBar on:choose={handle_choose} />
    {#if current_box == NavChoose.Message}
        <ChatBox {this_user} />
    {/if}
    {#if current_box == NavChoose.Setting}
        <Setting />
    {/if}
</div>

<style lang="postcss">
</style>
