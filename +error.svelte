<script lang="ts">
	import { page } from '$app/stores';
</script>
<title>
	{$page.status} - OnlyMySpace
</title>
<div class="flex flex-col justify-center items-center h-screen">
	<div class=" bg-base-200 flex flex-col justify-center items-center p-10 border-solid rounded-lg shadow-lg">
		<h1 class="text-center text-3xl font-bold">{$page.status}</h1>
		<h1 class="text-2xl font-bold text-center">{$page.error?.message}</h1>
		<p class="text-center text-sm">Psst... if this issue presists, please <a class="link link-primary" href="/contact"> contact us</a></p>
	</div>
</div>