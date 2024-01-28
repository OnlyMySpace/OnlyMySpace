<script lang="ts">
	import type { UserProfile } from "$lib";

    export let profile: UserProfile;
</script>

<img
	style={`border-color: ${profile.pfp.border_color};`}
	src={profile.pfp.url}
	alt="Profile"
	class="w-32 h-32 object-cover object-center top-3 rounded-full"
	class:border-4={!profile.pfp.no_border}
/>
<h1 class="text-5xl font-bold text-center sm:pb-4 tooltip" data-tip={'ID ' + profile.id}>
	{profile.uname}<span style="color: {profile.textColor}; opacity:0.65"
		>{profile.pronnouns ? ' - ' + profile.pronnouns : ''}</span
	>
</h1>
