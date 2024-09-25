<script>
	import { PUBLIC_PLATFORM_APP_BASE_URL } from '$env/static/public';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	let sessionExists = false;
</script>

<Toaster />
<main class="bg-secondary min-h-screen min-w-full p-2">
	{#if sessionExists}
		<p>Session exists</p>
	{/if}
	<slot></slot>
	<div class="absolute inset-x-0 bottom-0 p-2">
		<a href={PUBLIC_PLATFORM_APP_BASE_URL}>Lockform</a>
	</div>
</main>
