<script>
    import Mybutton from "./Mybutton.svelte";
</script>
<nav class="container-fluid">
    <ul>
        <li>
            <a href="./" class="contrast"><strong>Brand</strong></a>
        </li>
    </ul>
    <ul>
        <li>
            <details role="list" dir="rtl">
                <summary aria-haspopup="listbox" role="link" class="secondary">Example 1</summary>
                <ul role="listbox">
                    <li><p>t1</p></li>
                    <li><p>t2</p></li>
                    <li><p>t3</p></li>
                    <li><p>t4</p></li>
                </ul>
            </details>
        </li>
    </ul>
</nav>

<style>
</style>