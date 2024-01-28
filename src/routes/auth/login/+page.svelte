<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
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
		class="border-2 border-primary rounded-md lg:w-1/5 md:w-1/5 flex flex-col justify-center items-center px-9 max-w-sm"
		action=""
		method="post"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
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
		<h1 class="text-3xl font-bold text-center py-4">Access your Space!</h1>
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
		<button type="submit" class="btn-primary btn my-4 rounded-md">Log in</button>
	</form>
</div>
