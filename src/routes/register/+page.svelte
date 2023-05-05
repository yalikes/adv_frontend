<script lang="ts">
    import { goto } from "$app/navigation";
    import { SERVER_URL } from "$lib/constants";
    import { fetch_post_json } from "$lib/my_fetch";
    import { Session } from "$lib/session";
    import { UserRegisterRequest, UserRegisterResultInfo } from "$lib/user";
    let user_name = "";
    let password = "";
    let info_message = "";

    function login() {
        let session_id = localStorage.getItem("session");
        if (!session_id) {
            goto("/login");
        } else {
            goto("/");
        }
    }
    function register() {
        fetch_post_json(
            "/user/register",
            JSON.stringify(new UserRegisterRequest(user_name, password))
        ).then((obj) => {
            if (obj["state"] == "Ok") {
                let result_info = <UserRegisterResultInfo>obj;
                localStorage.setItem(
                    "session",
                    result_info.session_info.session_id
                );
                info_message = "注册成功, 您的用户ID: " + result_info.user_id;
            }else{
                info_message = "注册失败, 原因: " + obj["state"];
            }
        });
    }
</script>

<div
    class="bg-[--nav-border-gray] w-screen h-screen flex flex-col justify-center"
>
    <div
        class="bg-gray-600 w-1/2 h-2/3 rounded-3xl self-center flex flex-col justify-center"
    >
        <div class="self-center text-xl h-12 p-4 text-white">
            {info_message}
        </div>
        <div class=" self-center">
            <div class="grid grid-cols-[6rem_16rem] grid-rows-2">
                <label for="user name" class=" text-white p-2 text-xl text-center">
                    用户名:
                </label>
                <input
                    placeholder="在此输入用户名"
                    class="px-2 bg-[--input-bg-gray] rounded-sm text-xl p-1
                    text-white overflow-auto self-center"
                    bind:value={user_name}
                />
                <label for="password" class=" text-white p-2 text-xl self-center text-center">
                    密码:
                </label>
                <input
                    placeholder="在此输入密码"
                    type="password"
                    class="px-2 bg-[--input-bg-gray] rounded-sm text-xl p-1
                    text-white overflow-auto self-center"
                    bind:value={password}
                />
            </div>
            <div class="grid grid-cols-2">
                <div class=" pr-1 py-2 h-12">
                    <button
                        on:click={login}
                        class="bg-white h-full w-full rounded-sm text-black"
                    >
                        返回登录
                    </button>
                </div>
                <div class=" pl-1 py-2 h-12">
                    <button
                        on:click={register}
                        class="bg-sky-400 h-full w-full rounded-sm text-white"
                    >
                        确定注册
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
