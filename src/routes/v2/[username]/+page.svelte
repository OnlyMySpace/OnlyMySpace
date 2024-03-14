<script lang="ts">
	import type { UserProfile } from '$lib';
	import GFont from '$components/profilesubcomp/GFont.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import UserCard from '$components/profilesubcomp/UserCard.svelte';
	import SocialMedias from '$components/profilesubcomp/SocialMedias.svelte';
	import WidgetRenderer from '$components/profilesubcomp/WidgetRenderer.svelte';
	export let data: PageData;

	let profile: UserProfile = JSON.parse(data.profile);

	let bgStyle =
		profile.backgroundType == 'image'
			? `background-image: url('${profile.background}')`
			: `background-color: ${profile.background}`;

	async function registerFontFace() {
		if (!profile.font.is_google_font) {
			await new FontFace(profile.font.font_name, `url(${profile.font.font_url})`).load();
		}
	}

	async function handleView() {
		setTimeout(() => {
			fetch('/api/views', {
				body: JSON.stringify({
					id: profile.id
				}),
				method: 'POST'
			});
		}, 1500);
	}

	onMount(async () => {
		registerFontFace();
		handleView();
	});
</script>

<svelte:head>
	<title>
		{profile.uname}
	</title>
	{#if profile.font.is_google_font}
		<GFont fname={profile.font.font_name} />
	{/if}
</svelte:head>

<div>
	{#if data.blacklisted}
		<h1 class="text-3xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-10">
			This user is blacklisted
		</h1>
	{/if}
	<div class:blur-lg={data.blacklisted}>
		<div
			style={`font-family: ${profile.font.font_name}, font-display: swap, ${profile.font.font_alt}; color: ${profile.textColor};${bgStyle}`}
			class="flex items-center justify-center h-screen w-screen bg-no-repeat bg-center bg-cover"
		>
			<div
				class="flex flex-col justify-center items-center gap-3 h-screen w-screen rounded-lg shadow-2xl backdrop-blur-sm lg:w-1/2 lg:h-fit lg:py-10"
			>
				<UserCard {profile} badges={data.badges} />
				<SocialMedias {profile} />
				<p class="text-2xl font-bold text-center whitespace-pre-wrap">{profile.bio}</p>

				<WidgetRenderer widget={profile.widget} />

				<div class="fixed bottom-5 right-5 flex flex-row gap-2">
					<span class="inline-flex gap-2">
						<img class="w-6 h-6" src="/eye.svg" alt="Views" />
						{data.views}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>