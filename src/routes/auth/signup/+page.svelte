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
		class="bg-black/20 backdrop-blur-3xl border-2 border-slate-600 rounded-md flex flex-col justify-center items-center max-w-full lg:max-w-2/5 md:max-w-2/3 px-9 mx-1"
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
			class="input w-full max-w-xs my-4 border-2 border-slate-900"
		/>
		<input
			type="email"
			name="email"
			placeholder="Email"
			class="input w-full max-w-xs border-2 border-slate-900 mb-4"
			id="email"
		/>
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="input w-full max-w-xs border-2 border-slate-900"
			id="password"
		/>
		<div class="flex flex-row justify-center items-center gap-3 my-4">
			<input type="checkbox" class="checkbox checkbox-ghost" name="tos" id="tos" />
			<label for="tos"
				>I agree to the <a href="/tos" class="link link-primary">Terms of Service</a></label
			>
		</div>
		{#if !dev}
			<div class="w-full max-w-xs my-4">
				<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} />
			</div>
		{/if}
		<button type="submit" class="btn my-4 rounded-md">Sign up</button>
	</form>
</div>

<style lang="postcss">
	.btn {
		@apply btn-ghost shadow-lg shadow-[rgba(0,0,0,0.1)] backdrop-blur-lg my-2 rounded-md border-2 border-solid border-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)];
	}

	input {
		@apply bg-[rgba(0,0,0,0.1)] backdrop-blur-lg text-white placeholder:text-white/70 border-4 border-black border-opacity-10;
	}
</style>
