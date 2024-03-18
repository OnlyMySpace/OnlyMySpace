<script lang="ts">
	import Profile from "$components/Profile.svelte";
	import type { PageData } from "./$types";
    export let data: PageData;
	let hideWarning = false;
</script>
<title>
	{JSON.parse(data.profile.toString()).uname}
</title>
<div class:overflow-hidden={!hideWarning}>
	<div class="bg-error w-full h-12 text-center" class:hidden={hideWarning}>
		<p class="text-3xl font-bold">This page is deceprated. Please use the new profile page (wihtout /legacy/) instead <span on:click={() => hideWarning = true} class:hidden={hideWarning} tabindex={0} class="text-3xl font-bold cursor-pointer" aria-roledescription="Close" role="button">X</span>
		</p>
	</div>
	{#if data.blacklisted}
	<h1 class="text-3xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-10">This user is blacklisted</h1>
	{/if}
	<div class:blur-lg={data.blacklisted}>
		<Profile profile={JSON.parse(data.profile.toString())} views={data.views} badges={data.badges}/>
	</div>
</div>