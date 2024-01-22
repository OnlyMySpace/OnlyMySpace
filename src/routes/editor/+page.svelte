<script lang="ts">
	import { exampleProfile, type Social, type UserProfile } from '$lib';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { fade } from 'svelte/transition';

	let pfpPreviewShown = false;
	let pfpPreview: HTMLImageElement;

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

	function updateProfile() {
		if (!profile) return;
		fetch(window.location.href, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(profile)
		})
	}

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

	function handleProfilePicChange(event: Event) {
		let reader = new FileReader();
		reader.onload = () => {
			if (!profile || !reader.result) return;
			pfpPreviewShown = true;
			pfpPreview.setAttribute('src', reader.result as string);
		};
		// @ts-ignore
		if (!profile || !event.target || !event.target.files) return;
		// @ts-ignore
		reader.readAsDataURL(event.target.files[0]);
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
		<div class="flex flex-col justify-center items-center">
			<div class="flex flex-col justify-center items-center gap-2">
				<h1 class="text-2xl font-bold pb-4">The important stuff!</h1>
				<!-- This part is for pfp, username, pronnouns and bio -->
				<input
					type="text"
					class="input w-full max-w-xs"
					placeholder="Username"
					bind:value={profile.uname}
				/>
				<textarea
					class="textarea w-full max-w-xs"
					placeholder="Bio"
					rows="3"
					bind:value={profile.bio}
				></textarea>
				<input
					type="text"
					class="input w-full max-w-xs"
					placeholder="Pronouns"
					bind:value={profile.pronnouns}
				/>
				<input
					type="file"
					id="profilePic"
					name="profilePic"
					class="input w-full max-w-xs file-input file-input-bordered"
					accept="image/*"
					on:change={(e) => handleProfilePicChange(e)}
				/>
				<label for="checkbox" class="label cursor-pointer flex gap-4"
					>No border <input
						type="checkbox"
						class="toggle toggle-primary"
						bind:checked={profile.pfp.no_border}
					/>
				</label>
				{#if !profile.pfp.no_border}
					<div class="flex flex-col justify-center items-center">
						<h1 class="text-2xl font-bold pb-4">Border Color</h1>
						<ColorPicker label="Border Color" bind:hex={profile.pfp.border_color} />
					</div>
				{/if}
				<h1 class="text-2xl font-bold pb-4">Preview</h1>
				<img
					class:hidden={!pfpPreviewShown}
					class="h-32 w-32 rounded-full object-cover object-center"
					style={profile.pfp.no_border ? '' : `border-color: ${profile.pfp.border_color}`}
					class:border-4={!profile.pfp.no_border}
					alt="Profile preview"
					bind:this={pfpPreview}
				/>
			</div>
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
						profile.socials.push({ name: '', value: '', icon: '', type: 'handle' });
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
								value={social.name.charAt(0).toUpperCase() + social.name.slice(1)}
							>
								<!-- Added capitalization for the value above to be backwards compatible -->
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
			<div class="flex flex-col justify-center items-center gap-2">
				<!-- Music player toggle -->
				<h1 class="text-2xl font-bold pb-4">Music Player</h1>
				<div
					class="flex flex-row justify-center items-center gap-2"
					transition:fade={{ duration: 200 }}
				>
					<label for="">Enable music player</label>
					<input
						type="checkbox"
						class="toggle toggle-primary"
						checked={profile.musicPlayer != null}
						on:change={() => {
							if (profile.musicPlayer == null) {
								profile.musicPlayer = { songName: '', songArtist: '', songUrl: '', songCover: '' };
							} else {
								profile.musicPlayer = null;
							}
						}}
					/>
				</div>
				{#if profile.musicPlayer != null}
					<div class="flex flex-col justify-center items-center gap-2">
						<div
							class="flex flex-row justify-center items-center gap-2"
							transition:fade={{ duration: 200 }}
						>
							<label for="">Name</label>
							<input
								type="text"
								placeholder="Name"
								class="input w-full max-w-xs"
								bind:value={profile.musicPlayer.songName}
							/>
						</div>
						<div
							class="flex flex-row justify-center items-center gap-2"
							transition:fade={{ duration: 200 }}
						>
							<label for="">Artist</label>
							<input
								type="text"
								placeholder="Artist"
								class="input w-full max-w-xs"
								bind:value={profile.musicPlayer.songArtist}
							/>
						</div>
						<div
							class="flex flex-row justify-center items-center gap-2"
							transition:fade={{ duration: 200 }}
						>
							<!-- Cover file -->
							<label for="">Cover</label>
							<input
								type="file"
								accept="image/*"
								class="file-input file-input-bordered w-full max-w-xs"
								on:change={(ev) => {
									// @ts-ignore
									const file = ev.target.files?.[0];
								}}
							/>
						</div>
						<div
							class="flex flex-row justify-center items-center gap-2"
							transition:fade={{ duration: 200 }}
						>
							<!-- Audio file -->
							<label for="">Audio</label>
							<input
							type="file"
							accept="audio/mpeg"
								class="file-input file-input-bordered w-full max-w-xs"
								on:change={(ev) => {
									// @ts-ignore
									const file = ev.target.files?.[0];
									if (file) {
										if (file.type != 'audio/mpeg') {
											alert("Only .mp3 files are allowed to be uploaded here")
											return;
										}
									}
								}}
							/>
						</div>
					</div>
				{/if}
			</div>
			<button type="submit" class="btn-primary btn my-4 rounded-md" on:click={() => updateProfile()}>Save</button>
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
	input[type='text'],
	textarea {
		@apply bg-base-200;
	}
</style>
