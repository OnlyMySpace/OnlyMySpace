<script lang="ts">
	import MusicPlayer from './MusicPlayer.svelte';
	export let isExample: boolean = false;
	interface Widget {
		name: string;
	}

	interface Card {
		borderColor: string;
		backgroundColor: string;
	}

	interface UserProfile {
		font: string;
		id: number;
		pfp: string;
		card: Card;
		uname: string;
		textColor: string;
		backgroundType: 'image' | 'color';
		background: string;
		socials: {
			name: string;
			value: string;
			type: 'handle' | 'url';
			icon: string;
		}[];
		bio: string;
		widget: Widget | null;
        musicPlayer: {
            songName: string;
            songUrl: string;
            songCover: string;
            songArtist: string;
        } | null;
	}

	let exampleUProf: UserProfile = {
		font: '/fonts/Minecraft.ttf',
		id: 0,
		pfp: 'https://cdn.discordapp.com/avatars/1145633886286663742/41ec66dc219d7d2af1d96d6f929706d8.webp?size=1024',
		uname: 'nano',
		card: {
			borderColor: '#9CA3DB',
			backgroundColor: '#52489C'
		},
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
		bio: 'A professional idiot. WebDev and a femboy :3',
		widget: null,
        musicPlayer: {
            songName: "Bőrönd",
            songArtist: "Carson Coma",
            songCover: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.SP7subimt_OrqeVykY2h9wHaHa%26pid%3DApi&sp=1705256091T379a148d584c5fad029fe94b00456ffbbf5f3f7653d32f80c9086f62b3898603",
            songUrl: "https://cdn.discordapp.com/attachments/1145660131711926282/1196167696698581113/y2mate.is_-_Carson_Coma_Borond-7X8pdvYDyBM-192k-1696941727.mp3?ex=65b6a4fa&is=65a42ffa&hm=4ecd88949ee1b15ac53df738c123dc074b6a4dce623d0c66f32cc459c8d01fd6&"
        }
	};

	let bgStyle: string;
	if (exampleUProf.backgroundType == 'image') {
		bgStyle = `background-image: url('${exampleUProf.background}')`;
	} else {
		bgStyle = `background-color: ${exampleUProf.background}`;
	}
</script>

<svelte:head>
	{#if !isExample}
	<title>{exampleUProf.uname}</title>
	{/if}
</svelte:head>
<div
	style={`font-family: 'Minecraft', sans-serif; color: ${exampleUProf.textColor};${bgStyle}`}
	class="w-screen h-screen bg-no-repeat bg-center bg-fixed bg-cover flex items-center justify-center overflow-hidden"
>
	<div
        class="lg:w-1/2 md:w-3/4 sm:w-screen grid gap-10 p-12 rounded-lg shadow-2xl backdrop-blur-sm"
    >
		<div class="flex flex-col justify-center items-center">
			<img
				style={`border-color: ${exampleUProf.card.borderColor};`}
				src={exampleUProf.pfp}
				alt="Profile"
				class="w-32 h-32 rounded-full border-4"
			/>
		</div>
		<div class="flex flex-col justify-center items-center">
            <div class="flex flex-col justify-center items-center">            
                <h1 class="text-5xl font-bold text-center pb-4 tooltip" data-tip={'ID ' + exampleUProf.id}>
                    {exampleUProf.uname}
                </h1>
                <div class="flex flex-row justify-center items-center gap-4 w-fit backdrop-blur-sm bg-base-100 bg-opacity-20 rounded-lg h-8 p-4 mb-4">
                    {#each exampleUProf.socials as social}
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
				{exampleUProf.bio}
			</p>
		</div>
		<div class="flex flex-col justify-center items-center w-[1fr] h-[1fr]">
            {#if exampleUProf.musicPlayer}
			<MusicPlayer {...exampleUProf.musicPlayer} />
            {/if}
		</div>
	</div>
</div>
