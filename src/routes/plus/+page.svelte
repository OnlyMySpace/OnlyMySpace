<script lang="ts">
	import Navbar from "$components/navbar.svelte";
	import type { PageData } from "./$types";
    export let data: PageData;
    let email = data.email;
</script>
<svelte:head>
    <title>OnlyMySpace+</title>
</svelte:head>
<Navbar/> 
<style lang="postcss">
    .squiggly-gradient {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-top: 1em;
    }
    .squiggly-gradient::before {
        z-index: -1;
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 40px;
        height: 10px;
        background-image: linear-gradient(to right, #ff0080, #e100ff);
    }

    .perk-card {
        @apply w-1/3 h-32 shadow-indigo-500 shadow-2xl rounded-xl from-indigo-400/10 via-purple-500/10 to-pink-500/10 bg-gradient-to-r p-4 flex flex-col justify-center items-center;    
    }
</style>

<div class="flex flex-col justify-center items-center gap-4">
    <h1 class="text-5xl font-bold text-center">
        OnlyMySpace+
        <div class="squiggly-gradient"/>
    </h1>
    <h2 class="text-2xl font-bold text-center">Help keep OnlyMySpace free for everyone and get some benefits!</h2>
    <h3 class="text-xl font-bold text-center">Plus users get:</h3>
    <div class="w-1/2 flex flex-row justify-center items-center gap-4">
        <div class="perk-card">
            <p class="text-5xl font-bold text-center">+</p>
            <p class="text-1xl font-bold text-center">A free profile effect every month!</p>
        </div>
        <div class="perk-card">
            <p class="text-5xl font-bold text-center">+</p>
            <p class="text-1xl font-bold text-center">Quicker support!</p>
        </div>
        <div class="perk-card">
            <p class="text-5xl font-bold text-center">+</p>
            <p class="text-1xl font-bold text-center">Sneak-peeks and update previews!</p>
        </div>
    </div>

    <p class="text-1xl font-bold text-center">Get it today for only $4.99. No subscription just a one-time payment!</p>

    <a href="https://onlymyspace.mysellix.io/pay/06e8ae-6846b975fb-da6ea2?gateway=LITECOIN&step=GATEWAYS&email={email}&" class="btn btn-primary mt-8">Buy Plus now!</a>
</div>
