<script>
    import FaComments from "svelte-icons/fa/FaComments.svelte";
    import SideBarIcon from "./SideBarIcon.svelte";
    import MdSettings from "svelte-icons/md/MdSettings.svelte";
</script>

<nav
    class="h-screen w-16 m-0 flex
        flex-col bg-[--nav-bg-black] text-white shadow-lg"
>
    <SideBarIcon tooltip={"message"}>
        <FaComments />
    </SideBarIcon>
    <SideBarIcon tooltip={"setting"}>
        <MdSettings />
    </SideBarIcon>
</nav>
