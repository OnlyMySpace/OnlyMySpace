<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import { Turnstile } from 'sveltekit-turnstile';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import { dev } from '$app/environment';
	if (dev) {
		console.log('Dev mode is on');
	}
	let msg: string | undefined;
    $: {
        if (msg !== undefined) {
            setTimeout(() => {
                msg = undefined;
            }, 3000);
        }
    }
</script>

<div class="flex flex-col justify-center items-center h-screen w-screen">
	<div class="toast toast-top toast-end">
		{#if msg !== undefined}
			<div class="alert alert-error" in:fly={{ y: 20, duration: 200 }} out:fly={{ y: -20, duration: 200 }}>
				<span>{msg}</span>
			</div>
		{/if}
	</div>
	<form
		class="border-2 border-primary rounded-md flex flex-col justify-center items-center max-w-sm lg:w-1/5 md:w-1/5 sm:w-1/3 px-9"
		action=""
		method="post"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			// `formElement` is this `<form>` element
			// `formData` is its `FormData` object that's about to be submitted
			// `action` is the URL to which the form is posted
			// calling `cancel()` will prevent the submission
			// `submitter` is the `HTMLElement` that caused the form to be submitted
			return async ({ result, update }) => {
				if (result.type === 'success') {
					goto('/editor');
				} else if (result.type === 'failure') {
					if (result.data && result.data.message && typeof result.data.message === 'string')
						msg = result.data.message;
				}
			};
		}}
	>
		<h1 class="text-3xl font-bold text-center py-4">Make your own Space!</h1>
		<input
			type="text"
			placeholder="Username"
			name="username"
			class="input w-full max-w-xs my-4 border-2 border-secondary"
		/>
		<input
			type="email"
			name="email"
			placeholder="Email"
			class="input w-full max-w-xs border-2 border-secondary mb-4"
			id="email"
		/>
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="input w-full max-w-xs border-2 border-secondary"
			id="password"
		/>
		{#if !dev}
		<div class="w-full max-w-xs my-4">
			<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY}/>
		</div>
		{/if}
		<button type="submit" class="btn-primary btn my-4 rounded-md">Sign up</button>
		<!-- <div class="divider divider-neutral w-10/12 self-center">OR</div>
        <button on:click={() => discordAuth()} class="btn-primary btn my-4 rounded-md">
        <img src="/socials/discord.svg" alt="Discord logo" class="w-6 h-6"/>
        Sign up with Discord
        </button>
        -->
	</form>
</div>
