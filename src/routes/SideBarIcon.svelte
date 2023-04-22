<script>
    export let tooltip = "";
</script>
<div class="sidebar-icon group">
    <div class="w-9  h-9 self-center">
        <slot></slot>
        <span class="sidebar-tooltip group-hover:scale-100">{ tooltip }</span>
    </div>
</div>