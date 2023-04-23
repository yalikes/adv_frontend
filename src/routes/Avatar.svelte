<script lang="ts">
    import DiGithubAlt from "svelte-icons/di/DiGithubAlt.svelte";
    import { AvatarColor } from "../lib/avatar_vars";
    export let bg: AvatarColor = AvatarColor.GREEN;
</script>

<div class="h-9 w-9 rounded-3xl {bg}">
    <DiGithubAlt />
</div>
