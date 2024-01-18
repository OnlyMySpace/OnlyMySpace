<script lang="ts">
	import { exampleProfile, type Social, type UserProfile } from '$lib';
	import type { PageData } from './$types';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { fade } from 'svelte/transition';
	type SocialMap = {
		[key: string]: {
			type: string;
			icon: string;
		};
	};
	let socialMap: SocialMap = {
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
			icon: '/socials/spotify.svg'
		},
		Youtube: {
			type: 'url',
			icon: '/socials/youtube.svg'
		},
		Tiktok: {
			type: 'url',
			icon: '/socials/tiktok.svg'
		},
		Paypal: {
			type: 'url',
			icon: '/socials/paypal.svg'
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

	export let data: PageData;

	function handleSocialsChange(ev: Event, social: Social) {
		if (!profile || !ev.target) return;
		let target = ev.target as HTMLSelectElement;
		let socialSelected = socialMap[target.value as string];
		if (!socialSelected) return;
		social.type = socialSelected.type as 'handle' | 'url';
		social.icon = socialSelected.icon as string;
		social.name = target.value as string;
		profile.socials = profile.socials.map((s) => {
			if (s.name == social.name) {
				return social;
			}
			return s;
		});
		console.log(profile.socials);
	}
	let profile: UserProfile;
	if (!data.profile) profile = exampleProfile;
	else profile = data.profile;

</script>

{#if profile}
	<div class="flex flex-col h-screen w-screen">
		<h1 class="text-3xl font-bold text-center py-4">
			Make your profile your <span class="text-primary underline underline-offset-4">own</span>
		</h1>
		<div class="flex flex-col gap-4 justify-center items-center">
			<div class="flex flex-col justify-center items-center">
				<h1 class="text-2xl font-bold pb-4">Text Color</h1>
				<ColorPicker label="Text Color" bind:hex={profile.textColor} />
			</div>
			<div class="flex flex-col justify-center items-center">
				<h1 class="text-2xl font-bold">Background</h1>
				<div class="flex flex-row justify-center items-center">
					<label class="label cursor-pointer flex gap-4">
						<span class="label-text">Image background</span>
						<input
							type="checkbox"
							class="toggle toggle-primary"
							checked={profile.backgroundType == 'image'}
							on:change={(event) => {
								if (!profile || !event.target) return;
								// @ts-ignore
								profile.backgroundType = event.target.checked ? 'image' : 'color';
								profile.background = '';
							}}
						/>
					</label>
				</div>
				{#if profile.backgroundType == 'image'}
					<input
						type="text"
						placeholder="Image URL"
						class="input w-full max-w-xs"
						bind:value={profile.background}
					/>
				{:else}
					<div>
						<ColorPicker label="Background Color" bind:hex={profile.background} />
					</div>
				{/if}
			</div>
			<div class="flex flex-col justify-center items-center gap-2">
				<h1 class="text-2xl font-bold pb-4">Font</h1>
				<div class="flex flex-row justify-center items-center gap-2">
					<label for="">Use google fonts service</label>
					<input
						type="checkbox"
						class="toggle toggle-primary"
						bind:checked={profile.font.is_google_font}
					/>
				</div>
				<input
					type="text"
					placeholder="Font Name"
					class="input w-full max-w-xs"
					bind:value={profile.font.font_name}
				/>
				<input
					type="text"
					placeholder="Font Alt Name"
					class="input w-full max-w-xs"
					bind:value={profile.font.font_alt}
				/>
				{#if !profile.font.is_google_font}
					<input
						transition:fade={{ duration: 200 }}
						type="text"
						placeholder="Font URL"
						class="input w-full max-w-xs"
						bind:value={profile.font.font_url}
					/>
				{/if}
			</div>
			<div class="flex flex-col justify-center items-center gap-2">
				<h1 class="text-2xl font-bold pb-4">Socials</h1>
				<button
					class="btn btn-primary"
					on:click={() => {
						profile.socials.push({ name: '', value: '', icon: '' ,type: 'handle'});
						profile.socials = profile.socials;
					}}>Add Social media</button
				>
				<div class="flex flex-col justify-center items-center gap-2">
					{#each profile.socials as social}
						<div
							class="flex flex-row justify-center items-center gap-2"
							transition:fade={{ duration: 200 }}
						>
							<select
								class="select select-bordered w-full max-w-xs"
								on:change={(ev) => handleSocialsChange(ev, social)}
								value={social.name}
							>
								<option disabled selected>Social media name</option>
								<option>Discord</option>
								<option>Twitter (X)</option>
								<option>Telegram</option>
								<option>Instagram</option>
								<option>Spotify</option>
								<option>Youtube</option>
								<option>Tiktok</option>
								<option>Paypal</option>
								<option>Patreon</option>
								<option>Reddit</option>
							</select>
							<input
								type="text"
								placeholder="Your social media @ or link"
								class="input w-full max-w-xs"
								bind:value={social.value}
							/>
							<button
								on:click={() => {
									profile.socials.splice(profile.socials.indexOf(social), 1);
									profile.socials = profile.socials;
								}}
								class="cursor-pointer btn">X</button
							>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{:else}
	<h1 class="text-3xl font-bold text-center">Loading...</h1>
	<p class="text-center">Taking too long to load? Try refreshing the page</p>
{/if}

<style lang="postcss">
	:global(body) {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}
	input[type='text'] {
		@apply bg-base-200;
	}
</style>
