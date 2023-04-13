<div class="my-button-div">
    <a class="my-a" href="http://material.design">
        <button class="my-button">
            <span class="my-button-span">Get started</span>
        </button>
    </a>
</div>

<style lang="postcss">
    .my-button-span {
        text-decoration: none;
        color: white;
        white-space: nowrap;
        cursor: pointer;
        font-size: 100%;
        position: relative;
        z-index: 1;
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        box-sizing: border-box;
        letter-spacing: 0;
    }
    .my-button {
        position: relative;
        width: 100%;
        padding: 0 48px;
        border: 0 48px;
        border-radius: 48px;
        border-style: none;
        border-width: 0;
        border-color: white;
        text-decoration: none;

        background-color: #0b57d0;
        font-size: 24px;
        height: 80px;
    }
    .my-a {
        text-decoration: none;
        border-width: 0;
        border: 0 48px;
        border-color: rgb(240, 248, 255);
        border-style: none;
        cursor: pointer;
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        padding: 1px;
        font-size: 16px;
        border-radius: 48px;
        transition: border-radius 0.2s cubic-bezier(0.2, 0, 0, 1);
        line-height: var(--mio-theme-v2-title-m-line-height);
        --mio-theme-v2-title-m-line-height: 24px;
    }
    .my-button-div{
        width: 20rem;
        height: 20rem;
    }
</style>
