<script lang="ts">
    import DiGithubAlt from "svelte-icons/di/DiGithubAlt.svelte";
    import { AvatarColor } from "../lib/avatar_vars";
    export let bg: string;
</script>

<div class="h-9 w-9 rounded-3xl my-bg-color" style="--bg-color: {bg}">
    <DiGithubAlt />
</div>

<style>
    .my-bg-color{
        background-color: var(--bg-color, lightgray);
    }
</style>
