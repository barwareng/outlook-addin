<script>
	import { PUBLIC_PLATFORM_APP_BASE_URL } from '$env/static/public';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import { doesSessionExist, logout } from '$utils/auth/supertokens';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogOut } from 'lucide-svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { msGraph } from '$utils/ms-graph';
	onMount(async () => {
		await msGraph();
	});
</script>

<ModeWatcher />

<Toaster />
<main class="bg-secondary min-h-screen min-w-full p-2">
	<slot></slot>
	<div class="absolute inset-x-0 bottom-0 flex items-center justify-between p-2">
		<a href={PUBLIC_PLATFORM_APP_BASE_URL}>Lockform</a>
		{#if doesSessionExist()}
			<Button variant="ghost" on:click={logout}>
				<LogOut class="h-4 w-4" />
			</Button>
		{/if}
	</div>
</main>
