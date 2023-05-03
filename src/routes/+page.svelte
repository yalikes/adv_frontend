<script lang="ts">
    import { NavChoose } from "$lib/nav_choose";
    import { get_user_info, sync_friends_list, type User } from "$lib/user";
    import { onMount } from "svelte";
    import ChatBox from "./ChatBox.svelte";
    import Setting from "./Setting.svelte";
    import SideBar from "./SideBar.svelte";
    import { goto } from "$app/navigation";
    import { Session } from "$lib/session";
    import { fetch_post_json } from "$lib/my_fetch";
    const BACKEND_SERVER = "backend.org:3000";

    let this_user: User;
    let session: Session;

    let current_box = NavChoose.GroupMessage;
    function handle_choose(e: CustomEvent<{ result: NavChoose }>) {
        current_box = e.detail.result;
    }
    onMount(() => {
        let session_id = localStorage.getItem("session");
        if (!session_id) {
            goto("/login");
        }
        session = new Session(session_id as string);
        get_user_info(session).then((user) => {
            if (user) {
                console.log(user);
                this_user = user;
            } else {
                goto("/login");
            }
        });
        sync_friends_list(session);

        let socket = new WebSocket("ws://" + BACKEND_SERVER + "/tunnel");

        socket.addEventListener("open", (event) => {
            socket.send(JSON.stringify(session)); //authorized token
        });

        socket.addEventListener("message", (event) => {
            
        });
    });
</script>

<div class="grid grid-cols-[4rem_minmax(400px,_1fr)]">
    <SideBar on:choose={handle_choose} />
    {#if current_box == NavChoose.GroupMessage}
        <ChatBox {this_user} is_in_group={true} session={session}/>
    {/if}
    {#if current_box == NavChoose.PrivateMessage}
        <ChatBox {this_user} is_in_group={false} session={session}/>
    {/if}
    {#if current_box == NavChoose.Setting}
        <Setting />
    {/if}
</div>

<style lang="postcss">
</style>
