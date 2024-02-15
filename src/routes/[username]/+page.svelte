<script lang="ts">
	import Profile from "../../components/Profile.svelte";
	import type { PageData } from "./$types";
    export let data: PageData
</script>
<title>
	{JSON.parse(data.profile.toString()).uname}
</title>
<div>
	{#if data.blacklisted}
	<h1 class="text-3xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-10">This user is blacklisted</h1>
	{/if}
	<div class:blur-lg={data.blacklisted}>
		<Profile profile={JSON.parse(data.profile.toString())} views={data.views} badges={data.badges}/>
	</div>
</div>