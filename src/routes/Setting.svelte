<script lang="ts">
    import { count } from "../messages";
    let countValue: number;
    count.subscribe((value) => {
        countValue = value;
    });
</script>

<div class="w-full h-screen overflow-auto bg-[--nav-border-gray]">
    this is setting count: {countValue}
</div>
