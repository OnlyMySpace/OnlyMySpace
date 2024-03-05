<script lang="ts">
	import { onMount } from 'svelte';
	import MusicPlayer from './widgets/MusicPlayer.svelte';
	import type { UserProfile } from "$lib";
	import UserCard from './profilesubcomp/UserCard.svelte';
	import SocialMedias from './profilesubcomp/SocialMedias.svelte';
	import { dev } from '$app/environment';
	import type { MusicWidgetData } from "$lib/widgets";
	import Cube from './widgets/Cube.svelte';
	import TimeIs from './widgets/TimeIs.svelte';
	import Quote from './widgets/Quote.svelte';

	let exampleProfile: UserProfile = {
		id: 0,
		bio: 'A very passionate developer! (lol)\nSpeaks: Hungarian (native), English',
		pfp: {
			url: 'https://ik.imagekit.io/onlymyspace/0',
			no_border: false,
			border_color: '#9CA3DB'
		},
		font: {
			font_alt: 'monospace',
			font_url: '/fonts/Minecraft.ttf',
			font_name: 'Minecraft',
			is_google_font: false
		},
		uname: 'nano',
		socials: [{ icon: '/socials/discord.svg', name: 'discord', type: 'handle', value: 'im_nano' }],
		pronnouns: 'Any pronnouns',
		textColor: '#ffffff',
		background:
			'https://ik.imagekit.io/onlymyspace/0-background',
		widget: null,
		backgroundType: 'image',
		rainbowTextColor: false
	};

	export let profile: UserProfile = exampleProfile;
	export let views: number = 0;
	export let badges: string[] = [];

	let bgStyle: string;
	if (profile.backgroundType == 'image') {
		bgStyle = `background-image: url('${profile.background}')`;
	} else {
		bgStyle = `background-color: ${profile.background}`;
	}

	let musicPlayerData: {
		songName: string;
		songUrl: string;
		songCover: string;
		songArtist: string;
	};
	let loadedMusicData = false;

	onMount(async () => {
		// Register a custom font face for that font if it doesn't exist
		if (!profile.font.is_google_font) {
			await new FontFace(profile.font.font_name, `url(${profile.font.font_url})`).load();
		}
		// Load Data for songPlayer
		if (profile == exampleProfile) {
			if (profile.musicPlayer) {
				musicPlayerData = {
					songName: profile.musicPlayer.songName,
					songUrl: profile.musicPlayer.songUrl,
					songArtist: profile.musicPlayer.songArtist,
					songCover: profile.musicPlayer.songCover
				};
				loadedMusicData = true;
			}
			return;
		}
		if (profile.widget && profile.widget.type == 'Music') {
			let widgetData: MusicWidgetData = profile.widget.widgetData as MusicWidgetData;
			let req = await fetch('/api/fetchYT', {
				body: JSON.stringify({
					songURL: widgetData.songUrl
				}),
				method: 'POST'
			});
			if (req.ok) {
				let resp = await req.json();
				if (resp && resp.url && resp.cover) {
					musicPlayerData = {
						songName: widgetData.songName,
						songUrl: resp.url,
						songArtist: widgetData.songArtist,
						songCover: resp.cover
					};
					loadedMusicData = true;
				}
			} else {
				profile.widget = null;
				console.error('Failed to fetch music player data');
				if(dev) {
					console.error(await req.text());
					console.error(req.status);
				}
			}
		}
		setTimeout(() => {
			fetch('/api/views', {
				body: JSON.stringify({
					id: profile.id
				}),
				method: 'POST'
			});
		}, 1500);
	});
</script>

<svelte:head>
	{#if profile.font.is_google_font}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family={profile.font.font_name.replaceAll(
				' ',
				'+'
			)}&display=swap"
			rel="stylesheet"
		/>
	{/if}
</svelte:head>

<div
	style={`font-family: ${profile.font.font_name}, ${profile.font.font_alt}; color: ${profile.textColor};${bgStyle}`}
	class="flex items-center justify-center h-screen w-screen bg-no-repeat bg-center bg-cover"
>
	<div
		class="flex flex-col justify-center items-center gap-3 h-screen w-screen rounded-lg shadow-2xl backdrop-blur-sm lg:w-1/2 lg:h-fit lg:py-10"
	>
		<UserCard {profile} {badges}/>
		<SocialMedias {profile} />
		<p class="text-2xl font-bold text-center whitespace-pre-wrap">{profile.bio}</p>
		{#if profile.widget}
		{#if profile.widget.type == 'Music'}
		<div>

			{#if loadedMusicData}
				<MusicPlayer {...musicPlayerData} />
			{:else}
				<div class="card card-compact w-fit h-fit bg-base-100 shadow-xl skeleton">
					<div class="flex justify-center">
						<figure class="rounded-lg skeleton h-52 w-52"></figure>
					</div>
					<div class="card-body w-60">
						<div class="h-6 skeleton rounded-md w-3/4 mb-4"></div>
						<div class="h-4 skeleton rounded-md w-1/2 mb-4"></div>
						<div class="h-3 skeleton rounded-md w-1/3"></div>
					</div>
				</div>
			{/if}
		</div>
		{:else if profile.widget.type == 'Cube'}
			<Cube/>
		{:else if profile.widget.type == 'Time'}
			<TimeIs timezone={profile.widget.widgetData.timezone} displayTimezone={profile.widget.widgetData.displayTimezone}/>
		
		{:else if profile.widget.type == 'Quote'}
			<Quote {...profile.widget.widgetData}/>
		{/if}
		{/if}
		
		<div class="fixed bottom-5 right-5 flex flex-row gap-2">
			<span class="inline-flex gap-2">
				<img class="w-6 h-6" src="/eye.svg" alt="Views" />
				{views}
			</span>
		</div>
	</div>
</div>