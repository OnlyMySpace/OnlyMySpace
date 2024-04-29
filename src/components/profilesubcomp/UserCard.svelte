<script lang="ts">
	import type { UserProfile } from '$lib';
	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';
	import { onMount } from 'svelte';
	import { loadEmojiShape } from '@tsparticles/shape-emoji';

	let ParticlesComponent: typeof import('@tsparticles/svelte').default;

	let currtime = new Date();
	onMount(async () => {
		const module = await import('@tsparticles/svelte');

		ParticlesComponent = module.default;
	});

	let particlesConfig: import('@tsparticles/engine').RecursivePartial<
		import('@tsparticles/engine').IOptions
	> = {
		fullScreen: {
			enable: false
		},
		interactivity: {
			// Mouse makes them move closer
			events: {
				onHover: {
					enable: true,
					mode: 'attract'
				}
			},
		},
		particles: {
			shape: {
				type: 'emoji',
				options: {
					emoji: {
						value: '💲'
					}
				}
			},
			number: {
				value: 20
			},
			size: {
				value: 9
			},
			move: {
				speed: 2,
				enable: true,
				direction: 'bottom'
			}
		}
	};
	export let profile: UserProfile;
	export let badges: string[] = [];

	let poll = false;

	let badgeMap: { [key: string]: string } = {
		OG: '/badges/OG.png',
		ADMIN: '/badges/ADMIN.png',
		DONATOR: '/badges/DONATOR.png',
		VERIFIED: '/badges/VERIFIED.png'
	};

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;
	};

	// Set a secret debug function to console
	function changepoll() {
		poll = true;
	}


	void particlesInit(async (engine) => {
		await loadSlim(engine);
		await loadEmojiShape(engine);
	});
</script>

<div class="w-52 h-32 relative overflow-hidden flex justify-center">
	{#if profile.profileEffect && profile.profileEffect == 'Lava'}
		<div
			class="absolute w-32 h-32 rounded-full opacity-30 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-800 animate-flicker"
		></div>
	{/if}

	{#if profile.profileEffect && profile.profileEffect == 'Money' && badges.includes('DONATOR')}
		<svelte:component
			this={ParticlesComponent}
			id="tsparticles"
			class="z-0 absolute"
			style=""
			options={particlesConfig}
			on:particlesLoaded={onParticlesLoaded}
		/>
	{/if}
	<img
		style={`border-color: ${profile.pfp.border_color};`}
		src={profile.pfp.url}
		alt="Profile"
		class="w-32 h-32 object-cover object-center top-3 rounded-full justify-center"
		class:border-4={!profile.pfp.no_border}
	/>
</div>
<h1
	class="text-5xl font-bold text-center sm:pb-4 tooltip"
	class:animate-rainbow={profile.rainbowTextColor}
	data-tip={'ID ' + profile.id}
>
	{profile.uname}<span style="color: {profile.textColor}; opacity:0.65"
		>{profile.pronnouns ? ' - ' + profile.pronnouns : ''}</span
	>
</h1>
<div class="flex flex-wrap justify-center gap-2">
	{#each badges as badge}
		<span
			class="border-primary border-2 rounded-full w-16 h-8 backdrop-blur-3xl tooltip flex justify-center items-center"
			data-tip={badge}
		>
			<img src={badgeMap[badge]} alt={badge} class="w-6 h-6" class:w-8={badge == 'OG'} />
		</span>
	{/each}
</div>
