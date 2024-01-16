<script lang="ts">
	import { onMount } from 'svelte';
	import MusicPlayer from './MusicPlayer.svelte';
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
	}

	let exampleProfile: UserProfile = {
		font: fontA,
		id: 0,
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
            songName: "Bőrönd",
            songArtist: "Carson Coma",
			songCover: "https://lastfm.freetls.fastly.net/i/u/770x0/9adae3aacd0252d80e43dd4131d37ae8.jpg#9adae3aacd0252d80e43dd4131d37ae8",
			songUrl: "https://cdn.discordapp.com/attachments/1145660131711926282/1196167696698581113/y2mate.is_-_Carson_Coma_Borond-7X8pdvYDyBM-192k-1696941727.mp3?ex=65b6a4fa&is=65a42ffa&hm=4ecd88949ee1b15ac53df738c123dc074b6a4dce623d0c66f32cc459c8d01fd6&"
        }
	};

	console.log(JSON.stringify(exampleProfile, null, 0));

	export let profile: UserProfile = exampleProfile;

	let bgStyle: string;
	if (profile.backgroundType == 'image') {
		bgStyle = `background-image: url('${profile.background}')`;
	} else {
		bgStyle = `background-color: ${profile.background}`;
	}

	onMount(async () => {
		// Register a custom font face for that font if it doesn't exist
		if (!profile.font.is_google_font) {
			await new FontFace(profile.font.font_name, `url(${profile.font.font_url})`).load();
		}
	})

</script>

<svelte:head>
	{#if !isExample}
	<title>{profile.uname}</title>
	{/if}
	{#if profile.font.is_google_font}
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
		<link href="https://fonts.googleapis.com/css2?family={profile.font.font_name.replaceAll(' ', '+')}&display=swap" rel="stylesheet">
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
				class="w-32 h-32 top-3 rounded-full" class:border-4={!profile.pfp.no_border}
			/>
			<h1 class="text-5xl font-bold text-center sm:pb-4 tooltip" data-tip={'ID ' + profile.id}>
				{profile.uname}
			</h1>
		</div>
		<div class="flex flex-col justify-center items-center">
            <div class="flex flex-col justify-center items-center">            
                <div class="flex flex-row justify-center items-center gap-4 w-fit backdrop-blur-sm bg-base-100 bg-opacity-20 rounded-lg h-8 px-2 lg:mb-4">
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
			<p class="text-2xl font-bold text-center hover">
				{profile.bio}
			</p>
		</div>
		<div class="flex flex-col justify-center items-center w-[1fr] h-[1fr]">
            {#if profile.musicPlayer}
			<MusicPlayer {...profile.musicPlayer} />
            {/if}
		</div>
	</div>
</div>
