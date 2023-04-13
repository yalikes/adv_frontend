<script>
    import Mybutton from "./Mybutton.svelte";
</script>

<h1 class="bold text-4xl text-center">Welcome to SvelteKit</h1>
<div>
    <p>
        Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
    </p>
    <button class="">Hello, TailWind</button>
</div>
<Mybutton />

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
    p {
        font-size: 2rem;
        width: clamp(45ch, 50%, 75ch);
    }
    div {
        display: flex;
        flex-direction: column;
    }
</style>