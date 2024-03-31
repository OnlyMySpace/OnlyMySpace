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

<title>
	Signup - OnlyMySpace
</title>

<div class="flex flex-col justify-center items-center min-h-screen w-screen bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 bg-repeat">
	<div class="toast toast-top toast-end">
		{#if msg !== undefined}
			<div
				class="alert alert-error"
				in:fly={{ y: 20, duration: 200 }}
				out:fly={{ y: -20, duration: 200 }}
			>
				<span>{msg}</span>
			</div>
		{/if}
	</div>
	<form
		class="border-2 border-primary rounded-md flex flex-col justify-center items-center max-w-sm lg:w-1/5 md:w-2/3 sm:w-1/3 px-9"
		action=""
		method="post"
		use:enhance={({formData, cancel }) => {
			if (formData.get('tos') !== 'on') {
				msg = 'You must agree to the terms of service in order to sign up!';
				cancel();
			}
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
		<div class="flex flex-row justify-center items-center gap-3 my-4">
			<input type="checkbox" class="checkbox checkbox-primary" name="tos" id="tos" />
			<label for="tos"
				>I agree to the <a href="/tos" class="link link-primary">Terms of Service</a></label
			>
		</div>
		{#if !dev}
			<div class="w-full max-w-xs my-4">
				<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} />
			</div>
		{/if}
		<button type="submit" class="btn-primary btn my-4 rounded-md">Sign up</button>
	</form>
</div>
