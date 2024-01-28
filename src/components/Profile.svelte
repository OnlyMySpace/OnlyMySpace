<script lang="ts">
	import { onMount } from 'svelte';
	import MusicPlayer from './MusicPlayer.svelte';
	import type { FontOptions, UserProfile } from '$lib';
	export let isExample: boolean = false;

	let fontA: FontOptions = {
		font_alt: 'monospace',
		font_name: 'Minecraft',
		font_url: '/fonts/Minecraft.ttf',
		is_google_font: false
	};

	let fontB: FontOptions = {
		font_alt: 'monospace',
		font_name: 'Fira Code',
		font_url: '',
		is_google_font: true
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
			},
			{
				name: 'telegram',
				type: 'url',
				value: 'https://t.me/example',
				icon: '/socials/telegram.svg'
			}
		],
		bio: 'A professional idiot and (not so professional) WebDev',
		widget: null,
		musicPlayer: {
			songName: 'Amerika',
			songArtist: 'Rammstein',
			songCover:
				'https://lastfm.freetls.fastly.net/i/u/770x0/36188c60827943a38870427b07a892eb.jpg#36188c60827943a38870427b07a892eb',
			songUrl:
				'https://cdn.discordapp.com/attachments/1196199160412639244/1196910955376951306/Rammstein_-_Amerika_Official_Video_Rr8ljRgcJNM.opus'
		}
	};

	export let profile: UserProfile = exampleProfile;

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
	});
	function shadeHexColor(color: string, percent: number): string {
		let f = parseInt(color.slice(1), 16),
			t = percent < 0 ? 0 : 255,
			p = percent < 0 ? percent * -1 : percent,
			R = f >> 16,
			G = (f >> 8) & 0x00ff,
			B = f & 0x0000ff;
		return (
			'#' +
			(
				0x1000000 +
				(Math.round((t - R) * p) + R) * 0x10000 +
				(Math.round((t - G) * p) + G) * 0x100 +
				(Math.round((t - B) * p) + B)
			)
				.toString(16)
				.slice(1)
		);
	}
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
	class="w-screen h-screen bg-no-repeat bg-center bg-fixed bg-cover flex items-center justify-center overflow-hidden"
>
	<div
		class="lg:w-1/2 md:w-3/4 sm:w-screen h-fit min-h-fit grid lg:gap-1 md:gap-1 lg:p-16 md:p-8 sm:p-4 rounded-lg shadow-2xl backdrop-blur-sm"
	>
		<div class="flex flex-col justify-center items-center">
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
		</div>
		<div class="flex flex-col justify-center items-center">
			<div class="flex flex-col justify-center items-center">
				<div
					class="flex flex-row justify-center items-center gap-4 w-fit backdrop-blur-sm bg-base-100 bg-opacity-20 rounded-lg h-8 px-2 lg:mb-4"
				>
					{#each profile.socials as social}
						{#if social.type == 'handle'}
							<div class="tooltip" data-tip={social.value}>
								<img class="w-6 h-6" src={social.icon} alt={social.name} />
							</div>
						{:else}
							<a href={social.value} class="tooltip" data-tip={social.name}>
								<img class="w-6 h-6" src={social.icon} alt={social.name} />
							</a>
						{/if}
					{/each}
				</div>
			</div>
			<p class="text-2xl font-bold text-center hover whitespace-pre">
				{profile.bio}
			</p>
		</div>
		<div class="flex flex-col justify-center items-center w-[1fr] h-[1fr]">
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
	</div>
</div>
