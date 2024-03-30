<title>
    {data.invalid ? 'Failed to verify your email' : 'Your email is successfully verified'}
</title>

<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData
</script>

<div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-3xl font-bold text-center py-4">{data.invalid ? 'Failed to verify your email' : 'Your email is successfully verified'}</h1>
    {#if data.invalid}
    <p class="text-red-500 text-center">{data.message}</p>
    {/if}
</div>