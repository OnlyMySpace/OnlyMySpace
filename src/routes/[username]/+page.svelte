<script lang="ts">
	import type { UserProfile } from '$lib';
	import GFont from '$components/profilesubcomp/GFont.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import UserCard from '$components/profilesubcomp/UserCard.svelte';
	import SocialMedias from '$components/profilesubcomp/SocialMedias.svelte';
	import WidgetRenderer from '$components/profilesubcomp/WidgetRenderer.svelte';
	import { dev } from '$app/environment';
	import { fade, fly } from 'svelte/transition';
	export let data: PageData;

	let profile: UserProfile = JSON.parse(data.profile);

	let bgStyle =
		profile.backgroundType == 'image'
			? `background-image: url('${profile.background}')`
			: `background-color: ${profile.background}`;

	let canPlayMusic = false;

	let musicSourceURL: string = '';

	async function registerFontFace() {
		if (!profile.font.is_google_font) {
			await new FontFace(profile.font.font_name, `url(${profile.font.font_url})`).load();
		}
	}

	/**
	 * Prepare the data for the music player
	 * @param music
	 * @returns string
	 */
	async function prepareMusicData(music: UserProfile['music']): Promise<string> {
		if (!music) {
			return ''; // @NOTE: This being empty doesn't matter since if music is null the program won't even try to play music
		}
		const req = await fetch('/api/fetchYT', {
			body: JSON.stringify({
				songURL: music?.songUrl
			}),
			method: 'POST'
		});
		if (req.ok) {
			const resp = await req.json();
			return resp && resp.url ? resp.url : '';
		} else {
			if (dev) {
				console.error(
					'Error while fetching music data',
					await req.text(),
					' reponse recieved with status code',
					req.status
				);
			}
			return '';
		}
	}

	/**
	 * Check if the users browser can play music (is autoplay enabled)
	 * @effect Set canPlayMusic
	 */
	function canPlay(): void {
		try {
			canPlayMusic = true;
			new Audio().play();
		} catch (e) {
			canPlayMusic = false;
		}
	}

	function handleView() {
		setTimeout(async () => {
			try {
				await fetch('/api/views', {
					body: JSON.stringify({
						id: profile.id
					}),
					method: 'POST'
				});
			} catch (e) {
				if (dev) {
					console.error(e);
				}
			}
		}, 1500);
	}

	onMount(async () => {
		registerFontFace();
		musicSourceURL = await prepareMusicData(profile.music);
		handleView();
	});

	$: {
		if (canPlayMusic && musicSourceURL != '') {
			setTimeout(async () => {
				let musicAudio = new Audio(await musicSourceURL)
				musicAudio.loop = true;
				musicAudio.play();
			},(profile.music?.autoplayDelay || 0) * 1000)
		}
	}
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
	{#if profile.music != null && !canPlayMusic}
		<div class="w-full h-full backdrop-blur-lg z-10 absolute flex items-center justify-center">
			<button
				class="text-4xl font-bold"
				transition:fly|in={{ duration: 600, y: -200 }}
				on:click={canPlay}>{profile.music.autoplayClickMessage}</button
			>
		</div>
	{/if}
	{#if data.blacklisted}
		<h1 class="text-3xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-20">
			Uh Oh! This user is blacklisted
		</h1>
	{/if}
	<div class:blur-lg={data.blacklisted}>
		<div
			style={`font-family: ${profile.font.font_name}, ${profile.font.font_alt}; color: ${profile.textColor};${bgStyle}`}
			class="flex items-center justify-center h-screen w-screen bg-no-repeat bg-center bg-cover"
		>
			{#if canPlayMusic}
				<div
					transition:fade|in={{ duration: 600, delay: 400 }}
					class="flex flex-col justify-center items-center gap-3 h-screen w-screen rounded-lg shadow-2xl backdrop-blur-sm lg:w-1/2 lg:h-fit lg:py-10"
				>
					<UserCard {profile} badges={data.badges} />
					<SocialMedias {profile} />
					<p class="text-2xl font-bold text-center whitespace-pre-wrap">{profile.bio}</p>

					<WidgetRenderer widget={profile.widget} widgets={profile.widgets} />

					<div class="fixed bottom-5 right-5 flex flex-row gap-2">
						<span class="inline-flex gap-2">
							<img class="w-6 h-6" src="/eye.svg" alt="Views" />
							{data.views}
						</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
