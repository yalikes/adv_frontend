<script lang="ts">
    import {
        AddGroupRequest,
        NewGroupRequest,
        type NewGroupRespone,
    } from "$lib/group";
    import { fetch_post_json } from "$lib/my_fetch";
    import type { Session } from "$lib/session";
    import { AddFriendRequest, this_app } from "$lib/user";
    import SettingInput from "./SettingInput.svelte";

    let group_add_info = "";
    let add_friend_info = "";
    let new_grp_info = "";

    type InputDoneEvent = CustomEvent<{ result: string }>;
    function add_group(event: InputDoneEvent) {
        let group_id_str = event.detail.result;
        let group_id = parseInt(group_id_str);
        fetch_post_json(
            "/group/add/member",
            JSON.stringify(
                new AddGroupRequest(<Session>this_app.this_session, group_id)
            )
        ).then((obj) => {
            if (obj["state"] == "Ok") {
                group_add_info = "加入群组成功";
            } else {
                group_add_info = "加入群组失败";
            }
        });
    }
    function add_friend(event: InputDoneEvent) {
        let user_id_str = event.detail.result;
        let user_id = parseInt(user_id_str);
        fetch_post_json(
            "/user/add/friend",
            JSON.stringify(
                new AddFriendRequest(<Session>this_app.this_session, user_id)
            )
        ).then((obj) => {
            if (obj["state"] == "Ok") {
                add_friend_info = "添加好友成功";
            } else {
                add_friend_info = "添加好友失败";
            }
        });
    }
    function new_group(event: InputDoneEvent) {
        let group_name = event.detail.result;
        fetch_post_json(
            "/group/new",
            JSON.stringify(
                new NewGroupRequest(<Session>this_app.this_session, group_name)
            )
        ).then((obj) => {
            if (obj["state"] == "Ok") {
                let new_grp_resp = <NewGroupRespone>obj;
                let grp_id = new_grp_resp.group_id;
                new_grp_info = "成功,群id: "+new_grp_resp.group_id;
            } else {
                add_friend_info = "失败,原因: "+obj["state"];
            }
        });
    }
</script>

<div
    class="flex flex-col w-full h-screen overflow-auto bg-[--nav-border-gray] text-white"
>
    <SettingInput
        info={group_add_info}
        item_name={"群组id"}
        button_name={"加入群组"}
        on:done={add_group}
    />
    <SettingInput
        info={add_friend_info}
        item_name={"用户id"}
        button_name={"添加好友"}
        on:done={add_friend}
    />
    <SettingInput
        info={new_grp_info}
        item_name={"群组名称"}
        button_name={"新建群组"}
        on:done={new_group}
    />
</div>
