<script lang="ts">
    import { goto } from "$app/navigation";
    import { SERVER_URL } from "$lib/constants";
    import { UserLoginRequest, type UserLoginInfo } from "$lib/login";
    import { Session } from "$lib/session";
    let user_id = "";
    let password = "";
    let info_message = "";
    function register() {
        goto("/register");
    }

    function login() {
        fetch("http://" + SERVER_URL + "/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                new UserLoginRequest(parseInt(user_id), password)
            ),
        })
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                let login_info: UserLoginInfo = json;
                if (login_info.state == "Success") {
                    localStorage.setItem(
                        "session",
                        login_info.session_info.session_id
                    );
                    goto("/");
                } else {
                    info_message = "登录失败: " + login_info.state;
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
            <div class="grid grid-cols-[4rem_16rem] grid-rows-2">
                <label for="user id" class=" text-white p-2 text-xl">
                    帐号:
                </label>
                <input
                    placeholder="在此输入帐号"
                    class="px-2 bg-[--input-bg-gray] rounded-sm text-xl p-1
                    text-white overflow-auto self-center"
                    bind:value={user_id}
                />
                <label for="password" class=" text-white p-2 text-xl">
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
                        on:click={register}
                        class="bg-white h-full w-full rounded-sm text-black"
                    >
                        注册
                    </button>
                </div>
                <div class=" pl-1 py-2 h-12">
                    <button
                        on:click={login}
                        class=" bg-sky-400 h-full w-full rounded-sm text-white"
                    >
                        登录
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
