<script lang="ts">
    import FaComments from "svelte-icons/fa/FaComments.svelte";
    import SideBarIcon from "./SideBarIcon.svelte";
    import MdSettings from "svelte-icons/md/MdSettings.svelte";
    import { createEventDispatcher } from "svelte";
    import { NavChoose } from "$lib/nav_choose";
    const dispatch = createEventDispatcher<{choose: {result: NavChoose}}>();
    function choose_message_box(){
        dispatch("choose", {result: NavChoose.Message})
    }
    function choose_setting_box(){
        dispatch("choose", {result: NavChoose.Setting})
    }
</script>

<nav
    class="h-screen w-16 m-0 flex
        flex-col bg-[--nav-bg-black] text-white shadow-lg"
>
    <SideBarIcon tooltip={"message"} on:click={choose_message_box}>
        <FaComments />
    </SideBarIcon>
    <SideBarIcon tooltip={"setting"} on:click={choose_setting_box}>
        <MdSettings />
    </SideBarIcon>
</nav>
