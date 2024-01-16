<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";
    import ColorPicker from "svelte-awesome-color-picker";
    export let data: PageData

    let textColorPickerOpen = false;
    let localfonts = ["/fonts/Minecraft.ttf"]
    let gfont: boolean = data.profile ? data.profile.font.is_google_font : true;
</script>

<div class="flex flex-col justify-center items-center">
	<form
		class="flex flex-col justify-center items-center m-10 w-1/3 pb-20 border rounded-lg"
		action="?/update"
		method="POST"
        use:enhance={({ formElement, formData, action, cancel, submitter }) => {
            if (textColorPickerOpen) {
                cancel();
            }
            return async ({ result, update }) => {
                
            }
        }}
	>
		<h1 class="text-3xl font-bold text-center py-4">Edit your profile</h1>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Display name</span>
			</div>
			<input
				type="text"
				placeholder="Display name"
				name="uname"
				value={data.profile ? data.profile.uname : ''}
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Bio</span>
			</div>
			<textarea value={data.profile ? data.profile.bio : ''} name="bio" class="textarea textarea-bordered h-24" placeholder="BIO"></textarea>
		</label>
        <div class="form-control w-full max-w-xs my-4">
            <h1 class="text-3xl font-bold text-center pt-4">Colors</h1>
            <label class="label-text" for="color">Text Color</label>
            <input type="hidden" name="color" value={data.profile.textColor}>
            <ColorPicker bind:isOpen={textColorPickerOpen} bind:hex={data.profile.textColor}/>            
        </div>
        <div class="form-control w-full max-w-xs">
            <h2 class="text-3xl font-bold text-center pt-4">Font</h2>
            <p class="text-center py-4 mx-4">You can type your favourite google font here or pick one from our non google fonts</p>
            <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Google font</span> 
                  <input type="checkbox" name="gfont" class="toggle" bind:checked={gfont} />
                </label>
              </div>
            {#if gfont}
                <input
                    type="text"
                    name="font"
                    value={data.profile.font.font_name}
                    class="input input-bordered w-full max-w-xs"
                    placeholder="E.g. Fira Code"
                />
            {:else}
                <select
                    name="font"
                    class="select select-bordered w-full max-w-xs"
                >
                    {#each localfonts as font}
                        <option value={font} selected={data.profile.font === font}>{font}</option>
                    {/each}
                </select>
            {/if}
        </div>
    </form>
</div>

<style lang="postcss">
    :global(body) {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
    }
</style>