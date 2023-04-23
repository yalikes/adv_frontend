<script>
    import FaComments from "svelte-icons/fa/FaComments.svelte";
    import SideBarIcon from "./SideBarIcon.svelte";
    import MdSettings from "svelte-icons/md/MdSettings.svelte";
    function choose_message_box(){

    }
    function choose_setting_box(){
        
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
