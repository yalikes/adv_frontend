<script lang="ts">
    import { NavChoose } from "$lib/nav_choose";
    import { User } from "$lib/user";
    import ChatBox from "./ChatBox.svelte";
    import Setting from "./Setting.svelte";
    import SideBar from "./SideBar.svelte";
    let this_user: User = new User("1", "algebnaly");

    let current_box = NavChoose.Message;
    function handle_choose(e: CustomEvent<{ result: NavChoose }>) {
        current_box = e.detail.result;
    }
</script>

<div class="grid grid-cols-[4rem_minmax(400px,_1fr)]">
    <SideBar on:choose={handle_choose} />
    {#if current_box == NavChoose.Message}
        <ChatBox this_user={this_user}/>
    {/if}
    {#if current_box == NavChoose.Setting}
        <Setting />
    {/if}
</div>

<style lang="postcss">
</style>
