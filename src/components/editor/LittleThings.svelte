<script lang="ts">
	import type { Social } from '$lib';
	import { profileStore } from '$lib/stores';
	import ColorPicker from 'svelte-awesome-color-picker';
	export let badges: string[] = [];

	function handleSocialsChange(ev: Event, social: Social) {
		if (!$profileStore || !ev.target) return;
		const index = $profileStore.socials.indexOf(social);
		let target = ev.target as HTMLSelectElement;
		const socialSelected = socialMap[target.value as string];
		if (!socialSelected) return;
		$profileStore.socials[index].type = socialSelected.type as 'handle' | 'url';
		$profileStore.socials[index].icon = socialSelected.icon as string;
		$profileStore.socials[index].name = target.value as string;
		$profileStore.socials = $profileStore.socials;
	}

	let socialMap: { [key: string]: { type: string; icon: string } } = {
		Discord: {
			type: 'handle',
			icon: '/socials/discord.svg'
		},
		'Twitter (X)': {
			type: 'url',
			icon: '/socials/twitter.svg'
		},
		Telegram: {
			type: 'url',
			icon: '/socials/telegram.svg'
		},
		Instagram: {
			type: 'url',
			icon: '/socials/instagram.svg'
		},
		Spotify: {
			type: 'url',
			icon: '/socials/spotify.png'
		},
		Youtube: {
			type: 'url',
			icon: '/socials/youtube.png'
		},
		Tiktok: {
			type: 'url',
			icon: '/socials/tiktok.svg'
		},
		Paypal: {
			type: 'url',
			icon: '/socials/paypal.png'
		},
		Patreon: {
			type: 'url',
			icon: '/socials/patreon.svg'
		},
		Reddit: {
			type: 'url',
			icon: '/socials/reddit.svg'
		}
	};
</script>

{#if $profileStore != null}
	<div class="grouped gap-2">
		<label for="textcolor" class="label text-white text-xl font-bold">Text Color</label>
		<ColorPicker label="Text Color" bind:hex={$profileStore.textColor} />
		<div class="flex flex-row items-center gap-2">
			<label for="checkbox" class="label cursor-pointer">Rainbow text</label>
			<input
				type="checkbox"
				class="toggle toggle-ghost hover:bg-[rgba(0,0,0,0.2)]"
				bind:checked={$profileStore.rainbowTextColor}
			/>
		</div>
	</div>

	<div class="grouped gap-2">
		<label for="fonts" class="label text-white text-xl font-bold">Fonts</label>
		<div class="flex flex-row items-center gap-2">
			<label for="checkbox" class="label cursor-pointer">Use google fonts service</label>
			<input
				bind:checked={$profileStore.font.is_google_font}
				type="checkbox"
				class="toggle toggle-ghost hover:bg-[rgba(0,0,0,0.2)]"
			/>
		</div>
		<input
			type="text"
			placeholder="Font Name"
			class="input w-full max-w-xs"
			bind:value={$profileStore.font.font_name}
		/>
		<input
			type="text"
			placeholder="Font Alt Name"
			class="input w-full max-w-xs"
			bind:value={$profileStore.font.font_alt}
		/>
		{#if !$profileStore.font.is_google_font}
			<input
				type="text"
				placeholder="Font URL"
				class="input w-full max-x-ws"
				bind:value={$profileStore.font.font_url}
			/>
		{/if}
	</div>

	<div class="grouped gap-2">
		<label for="profile" class="label text-white text-xl font-bold">Profile Effects</label>
		<select class="select select-ghost w-full max-w-xs" bind:value={$profileStore.profileEffect}>
			<option disabled selected>Select an effect</option>
			<option value="None">None</option>
			<option value="Lava">Lava</option>
			{#if badges.includes('DONATOR')}
				<option value="Money">Money</option>
			{/if}
		</select>
	</div>

	<div class="grouped">
		<label for="socials" class="label text-white text-xl font-bold">Socials</label>
		<button
			type="button"
			aria-label="Add social media"
			on:click={() => {
				$profileStore?.socials.push({ name: '', value: '', icon: '', type: 'handle' });
				$profileStore = $profileStore;
			}}>Add</button
		>
		{#each $profileStore.socials as social}
			<div class="flex flex-row items-center gap-2">
				<select
					class="select select-ghost w-full max-w-xs"
					value={social.name.charAt(0).toUpperCase() + social.name.slice(1)}
					on:change={(ev) => handleSocialsChange(ev, social)}
				>
					<option disabled selected>Social Media name</option>
					{#each Object.keys(socialMap) as key}
						<option class="text-black" value={key}>{key}</option>
					{/each}
				</select>
				<input
					type="text"
					placeholder="Username"
					class="input w-full max-w-xs"
					bind:value={social.value}
				/>
				<button
					type="button"
					class="cbtn"
					aria-label="Remove social media"
					on:click={() => {
						if ($profileStore?.socials == null) return;
						$profileStore.socials = $profileStore?.socials.filter((s) => s !== social);
						$profileStore = $profileStore;
					}}>X</button
				>
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	input,
	textarea,
	select {
		@apply bg-[rgba(0,0,0,0.1)] backdrop-blur-lg text-white placeholder:text-white/70 border-4 border-black border-opacity-10;
	}

	button {
		@apply btn bg-[rgba(255,255,255,0.1)] shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-lg border-2 border-solid border-[rgba(255,255,255,0.3)] my-2 rounded-md;
	}
	button:not(.cbtn) {
		@apply max-w-xs w-32;
	}
</style>
