<script lang="ts">
    export let tooltip = "";
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="sidebar-icon group" on:click>
    <div class="w-9  h-9 self-center">
        <slot></slot>
        <span class="sidebar-tooltip group-hover:scale-100">{ tooltip }</span>
    </div>
</div>