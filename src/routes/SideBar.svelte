<script lang="ts">
    import FaComments from "svelte-icons/fa/FaComments.svelte";
    import FaComment from "svelte-icons/fa/FaComment.svelte";
    import SideBarIcon from "./SideBarIcon.svelte";
    import MdSettings from "svelte-icons/md/MdSettings.svelte";
    import { createEventDispatcher } from "svelte";
    import { NavChoose } from "$lib/nav_choose";
    const dispatch = createEventDispatcher<{ choose: { result: NavChoose } }>();
    function choose_group_message_box() {
        dispatch("choose", { result: NavChoose.GroupMessage });
    }
    function choose_private_message_box() {
        dispatch("choose", { result: NavChoose.PrivateMessage });
    }
    function choose_setting_box() {
        dispatch("choose", { result: NavChoose.Setting });
    }
</script>

<nav
    class="h-screen w-16 m-0 flex
        flex-col bg-[--nav-bg-black] text-white shadow-lg"
>
    <SideBarIcon tooltip={"group message"} on:click={choose_group_message_box}>
        <FaComments />
    </SideBarIcon>
    <SideBarIcon
        tooltip={"private message"}
        on:click={choose_private_message_box}
    >
        <FaComment />
    </SideBarIcon>
    <SideBarIcon tooltip={"setting"} on:click={choose_setting_box}>
        <MdSettings />
    </SideBarIcon>
</nav>
