<script lang="ts">
    export let coins: number | undefined = undefined;
</script>

<nav class="navbar bg-black bg-opacity-20 text-neutral-content">
    <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/"
            ><img src="/favicon.png" class="w-10 h-10 md:w-16 md:h-16" alt="OnlyMySpace logo" />
        </a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/shop">Shop</a></li>
            <li><a href="/editor">Editor</a></li>
            <li><a href="/contact">Contact</a></li>
            <!-- Coin display -->
            {#if coins}
            <li><a href="/shop">Coins: {coins}</a></li>
            {/if}
        </ul>
    </div>
</nav>