<script lang="ts">
	import { exampleProfile, type Social, type UserProfile } from '$lib';
	import { Widgets, type DynamicWidget } from '$lib/widgets';
	import type { PageData } from './$types';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { fade, fly } from 'svelte/transition';

	let pfpPreviewShown = false;
	let pfpPreview: HTMLImageElement;

	type SocialMap = {
		[key: string]: {
			type: string;
			icon: string;
		};
	};

	let assets: { [key: string]: File | null } = {
		'background-img': null,
		'profile-img': null
	};

	let updatedProfile = false;

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

	async function updateProfile() {
		if (!profile) return;
		let formData = new FormData();
		// Append all formData  in a seperate formData elem
		for (let key in assets) {
			let f = assets[key];
			if (f) formData.append(key, f);
		}
		formData.append('profile', JSON.stringify(profile));
		let res = await fetch(window.location.href, {
			method: 'POST',
			body: formData
		});
		if (res.status == 200) {
			updatedProfile = true;
			setTimeout(() => {
				updatedProfile = false;
			}, 3000);
		}
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
	}

	function handleProfilePicChange(event: Event) {
		let reader = new FileReader();
		reader.onload = () => {
			// @ts-expect-error
			if (!profile || !reader.result || !event.target || !event.target.files) return;
			pfpPreviewShown = true;
			pfpPreview.setAttribute('src', reader.result as string);
			// @ts-expect-error
			assets['profile-img'] = event.target?.files?.[0] ?? null;
		};
		// @ts-expect-error
		if (!profile || !event.target || !event.target.files) return;
		// @ts-expect-error
		reader.readAsDataURL(event.target.files[0]);
	}

	function handleSelect(ev: Event) {
		if (!ev.target || (ev.target as HTMLSelectElement).value == null) return;
		let target = ev.target as HTMLSelectElement;
		let composed: DynamicWidget | null = null;
		if (target.value == 'Music Player') {
			composed = {
				type: Widgets.Music,
				widgetData: {}
			};
		} else if (target.value == 'Cube') {
			composed = {
				type: Widgets.Cube,
				widgetData: {}
			};
		} else if (target.value == 'Current Time') {
			composed = {
				type: Widgets.Time,
				widgetData: {}
			};
		} else {
			composed = null;
		}
		profile.widget = composed;
	}

	function getWidgetVal(): string {
		let type = profile.widget?.type;
		if (type == Widgets.Music) {
			return 'Music Player';
		} else if (type == Widgets.Cube) {
			return 'Cube';
		} else if (type == Widgets.Time) {
			return 'Current Time';
		} else {
			return 'None';
		}
	}

	$: widgetVal = getWidgetVal();
	let profile: UserProfile;
	if (!data.profile) profile = exampleProfile;
	else profile = data.profile;
</script>

<title> Editor </title>

{#if updatedProfile}
	<div class="fixed top-0 left-1/2 -translate-x-1/2 z-50" transition:fly|local={{ y: -100 }}>
		<div
			class="flex flex-row justify-center w-96 h-16 items-center gap-2 border-solid bg-opacity-80 backdrop-blur-md bg-gray-700 rounded-lg"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
				><path
					class="fill-green-500"
					d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
				/></svg
			>
			<p class="text-1xl font-bold">Successfully updated your profile</p>
		</div>
	</div>
{/if}

{#if profile}
	<div
		class="bg-center bg-no-repeat bg-cover h-full w-full"
		style="background-image: url('/bg.png');"
	>
		<div class="flex flex-col bg-gray-700/50 h-full">
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
					<div class="flex flex-row justify-center items-center gap-2">
						<label for="checkbox" class="label cursor-pointer">Rainbow text</label>
						<input
							type="checkbox"
							class="toggle toggle-primary"
							bind:checked={profile.rainbowTextColor}
						/>
					</div>
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
						<div class="flex flex-col justify-center items-center">
							<label for="">Background Image</label>
							<input
								type="file"
								name=""
								class="file-input file-input-bordered"
								on:change={(e) => {
									// @ts-expect-error
									const file = e.target.files?.[0];
									if (file) {
										assets['background-img'] = file;
									}
								}}
							/>
						</div>
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

				<div class="py-4 flex flex-col justify-center items-center">
					<h1 class="text-2xl font-bold pb-4">Widgets</h1>
					<select bind:value={widgetVal} on:change={handleSelect} class="select w-full max-w-xs">
						<option disabled selected>Select a widget</option>
						<option>Music Player</option>
						<option>Cube</option>
						<option>Current Time</option>
						<option>None</option>
					</select>
				</div>

				{#if profile.widget}
					{#if profile.widget.type == 'Music'}
						<div class="flex flex-col justify-center items-center gap-2">
							<!-- Music player toggle -->
							<h1 class="text-2xl font-bold pb-4">Music Player</h1>
							{#if profile.widget != null && profile.widget.type == 'Music'}
								<div class="flex flex-col justify-center items-center gap-2">
									<div
										class="flex flex-row justify-center items-center gap-2"
										transition:fade={{ duration: 200 }}
									>
										<label class="w-1/2" for="">Name</label>
										<input
											type="text"
											placeholder="Name"
											class="input w-full max-w-xs"
											bind:value={profile.widget.widgetData.songName}
										/>
									</div>
									<div
										class="flex flex-row justify-center items-center gap-2"
										transition:fade={{ duration: 200 }}
									>
										<label class="w-1/2" for="">Artist</label>
										<input
											type="text"
											placeholder="Artist"
											class="input w-full max-w-xs"
											bind:value={profile.widget.widgetData.songArtist}
										/>
									</div>
									<div
										class="flex flex-row justify-center items-center gap-2"
										transition:fade={{ duration: 200 }}
									>
										<!-- Audio file -->
										<label class="w-1/2" for="">Youtube link</label>
										<input
											type="text"
											placeholder="Youtube link"
											class="input w-full max-w-xs"
											bind:value={profile.widget.widgetData.songUrl}
										/>
									</div>
								</div>
							{/if}
						</div>
					{:else if profile.widget.type == 'Cube'}
						<div class="flex flex-col justify-center items-center gap-2">
							<h1 class="text-2xl font-bold pb-4">Cube</h1>
							<p>Settings coming soon</p>
						</div>
					{:else if profile.widget.type == 'Time'}
						<div class="flex flex-col justify-center items-center gap-2">
							<h1 class="text-2xl font-bold pb-4">Current Time</h1>
							<input type="text" placeholder="Europe/Amsterdam" class="input w-full max-w-xs" bind:value={profile.widget.widgetData.timezone}>
						</div>
					{/if}
				{/if}
				<button
					type="submit"
					class="btn-primary btn my-4 rounded-md"
					on:click={() => updateProfile()}>Save</button
				>
			</div>
			<footer class="flex flex-col justify-center items-center gap-2">
				<p>Copyright © 2023 - {new Date().getFullYear()} - All Rights Reserved</p>
				<p>
					Made with ❤️ by <a class="link link-primary" href="https://only-my.space/nano">nano</a>
				</p>
				<p>
					Join our <a class="link link-primary" href="https://discord.gg/SVsSQXf7HR">Discord</a>
				</p>
			</footer>
		</div>
	</div>
{:else}
	<h1 class="text-3xl font-bold text-center">Loading...</h1>
	<p class="text-center">Taking too long to load? Try refreshing the page</p>
{/if}

<style lang="postcss">
	:global(body) {
		--cp-bg-color: rgba(51, 51, 51, 0.5);
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}

	input[type='text'],
	input[type='file'],
	select,
	option,
	textarea {
		@apply bg-transparent backdrop-blur-md text-white placeholder:text-white border-4 border-black border-opacity-10 selection:border-none;
	}

	input[type='file']::file-selector-button {
		@apply bg-transparent backdrop-blur-md;
	}

	input[type='file']::-webkit-file-upload-button {
		@apply bg-transparent backdrop-blur-md;
	}
</style>
