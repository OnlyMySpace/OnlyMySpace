<script lang="ts">
	import { onMount } from 'svelte';
	import MusicPlayer from './MusicPlayer.svelte';
	import type { FontOptions, UserProfile } from '$lib';
	import UserCard from './profilesubcomp/UserCard.svelte';
	import SocialMedias from './profilesubcomp/SocialMedias.svelte';
	export let isExample: boolean = false;

	let fontA: FontOptions = {
		font_alt: 'monospace',
		font_name: 'Minecraft',
		font_url: '/fonts/Minecraft.ttf',
		is_google_font: false
	};

	let exampleProfile: UserProfile = {
		font: fontA,
		id: 0,
		pronnouns: 'Any pronnouns',
		pfp: {
			border_color: '#9CA3DB',
			no_border: false,
			url: 'https://cdn.discordapp.com/avatars/1145633886286663742/41ec66dc219d7d2af1d96d6f929706d8.webp?size=1024'
		},
		uname: 'nano',
		textColor: '#fff',
		backgroundType: 'image',
		background:
			'https://cdn.discordapp.com/attachments/1145660131711926282/1196095795066327060/pexels-malcolm-gillanders-16552418.jpg',
		socials: [
			{
				name: 'discord',
				type: 'handle',
				value: 'im_nano',
				icon: '/socials/discord.svg'
			}
		],
		bio: 'A professional idiot and (not so professional) WebDev',
		musicPlayer: {
			songName: 'Amerika',
			songArtist: 'Rammstein',
			songCover:
				'https://lastfm.freetls.fastly.net/i/u/770x0/36188c60827943a38870427b07a892eb.jpg#36188c60827943a38870427b07a892eb',
			songUrl:
				'https://cdn.discordapp.com/attachments/1196199160412639244/1196910955376951306/Rammstein_-_Amerika_Official_Video_Rr8ljRgcJNM.opus'
		},
		cursor: null
	};

	export let profile: UserProfile = exampleProfile;
	export let views: number = 0;
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
		if (profile.musicPlayer) {
			let req = await fetch('/api/fetchYT', {
				body: JSON.stringify({
					songURL: profile.musicPlayer.songUrl
				}),
				method: 'POST'
			});
			if (req.ok) {
				let resp = await req.json();
				if (resp && resp.url && resp.cover) {
					musicPlayerData = {
						songName: profile.musicPlayer.songName,
						songUrl: resp.url,
						songArtist: profile.musicPlayer.songArtist,
						songCover: resp.cover
					};
					loadedMusicData = true;
				}
			}
		}
		setTimeout(() => {
			fetch('/api/views', {
				body: JSON.stringify({
					id: profile.id
				}),
				method: 'POST'
			})
		},1500)
	});
</script>

<svelte:head>
	{#if !isExample}
		<title>{profile.uname}</title>
	{/if}
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
		<UserCard {profile} />
		<SocialMedias {profile} />
		<p class="text-2xl font-bold text-center">{profile.bio}</p>
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
		<div class="fixed bottom-5 right-5 flex flex-row gap-2">
			<span class="inline-flex gap-2">
				<img class="w-6 h-6" src="/eye.svg" alt="Views" />
				{views}
			</span>
		</div>
	</div>
</div>
