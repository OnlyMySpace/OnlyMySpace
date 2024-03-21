<script lang="ts">
	import Loading from '$components/Loading.svelte';
	import { assetsStore, profileStore } from '$lib/stores';
	import ColorPicker from 'svelte-awesome-color-picker';

	function handleProfilePictureChange(e: Event) {
		let reader = new FileReader();
		let target = e.target as HTMLInputElement;
		if (target != null && target.files != null && target.files.length > 0) {
			reader.readAsDataURL(target.files[0]);
		}
		reader.onload = () => {
			if (target != null && target.files != null && target.files.length > 0) {
				$assetsStore['profile-image'] = target.files[0] ? target.files[0] : null;
			}
		};
	}

	function handleBackgroundTypeSwitch(e: Event) {
		let target = e.target as HTMLInputElement;
		if (target == null || $profileStore == null) return;
		$profileStore.backgroundType = target.checked ? 'image' : 'color';
	}

	function handleBackgroundImageChange(e: Event) {
		let reader = new FileReader();
		let target = e.target as HTMLInputElement;
		if (target != null && target.files != null && target.files.length > 0) {
			reader.readAsDataURL(target.files[0]);
		}
		reader.onload = () => {
			if (target != null && target.files != null && target.files.length > 0) {
				$assetsStore['background-image'] = target.files[0] ? target.files[0] : null;
			}
		};
	}
</script>

{#if $profileStore != null}
	<input
		type="text"
		class="input w-full max-w-xs"
		placeholder="Username"
		bind:value={$profileStore.uname}
	/>
	<textarea
		class="textarea w-full max-w-xs min-h-32"
		placeholder="Bio"
		rows="3"
		bind:value={$profileStore.bio}
	></textarea>
	<input
		type="text"
		class="input w-full max-w-xs"
		placeholder="Pronouns"
		bind:value={$profileStore.pronnouns}
	/>
	<div class="grouped">
		<label for="profilePic" class="label text-white text-xl font-bold">Profile picture</label>
		<input
			type="file"
			id="profilePic"
			name="profilePic"
			class="input w-full max-w-xs file-input file-input-ghost"
			accept="image/*"
			on:change={handleProfilePictureChange}
		/>
		<div class="flex flex-row items-center gap-2">
			<label for="checkbox" class="label cursor-pointer font-bold">Disable border</label>
			<input
				type="checkbox"
				class="toggle toggle-ghost hover:bg-[rgba(0,0,0,0.2)]"
				bind:checked={$profileStore.pfp.no_border}
			/>
		</div>
		{#if !$profileStore.pfp.no_border}
			<ColorPicker label="Border Color" bind:hex={$profileStore.pfp.border_color} />
		{/if}
		{#if $assetsStore['profile-image']}
			<label for="img" class="label text-white text-xl font-bold">Preview</label>
			<img
				class="h-32 w-32 rounded-full object-cover object-center"
				alt="Profile preview"
				src={URL.createObjectURL($assetsStore['profile-image'])}
			/>
		{/if}
	</div>
	<div class="grouped gap-2">
		<label for="checkbox" class="label text-white text-xl font-bold">Background</label>
		<span class="flex flex-row items-center gap-2">
			Color<input
				type="checkbox"
				class="toggle toggle-ghost hover:bg-[rgba(0,0,0,0.2)]"
				checked={$profileStore.backgroundType == 'image'}
				on:change={handleBackgroundTypeSwitch}
			/>Image
		</span>
		{#if $profileStore.backgroundType == 'image'}
			<input
				type="file"
				class="input w-full max-w-xs file-input file-input-ghost"
				accept="image/*"
				on:change={handleBackgroundImageChange}
			/>
		{:else}
			<ColorPicker label="Background Color" bind:hex={$profileStore.background} />
		{/if}
	</div>
{:else}
	<Loading />
{/if}

<style lang="postcss">
	input,
	textarea {
		@apply bg-[rgba(0,0,0,0.1)] backdrop-blur-lg text-white placeholder:text-white/70 border-4 border-black border-opacity-10;
	}
</style>
