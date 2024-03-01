<script lang="ts">
	import type { UserProfile } from "$lib";

    export let profile: UserProfile;
	export let badges: string[] = [];

	let badgeMap: { [key: string]: string } = {
		"OG": "/badges/OG.png",
		"ADMIN": "/badges/ADMIN.png",
		"DONATOR": "/badges/DONATOR.png",
		"VERIFIED": "/badges/VERIFIED.png"
	};

</script>

<img
	style={`border-color: ${profile.pfp.border_color};`}
	src={profile.pfp.url}
	alt="Profile"
	class="w-32 h-32 object-cover object-center top-3 rounded-full"
	class:border-4={!profile.pfp.no_border}
/>
<h1 class="text-5xl font-bold text-center sm:pb-4 tooltip" class:animate-rainbow={profile.rainbowTextColor} data-tip={'ID ' + profile.id}>
	{profile.uname}<span style="color: {profile.textColor}; opacity:0.65"
		>{profile.pronnouns ? ' - ' + profile.pronnouns : ''}</span>
</h1>
<div class="flex flex-wrap justify-center gap-2">
	{#each badges as badge}
	<span class="badge badge-lg badge-primary tooltip" data-tip={badge}>
		<img src={badgeMap[badge]} alt={badge} class="w-6 h-6" class:w-8={badge == "OG"} />
	</span>
	{/each}
</div>
