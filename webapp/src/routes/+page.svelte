<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
	let subject = '';
	onMount(() => {
		const Office = window.Office;
		Office.onReady(() => {
			console.log('Office Ready!');
			subject = Office.context.mailbox.item?.subject;
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, () => {
				subject = Office.context.mailbox.item?.subject;
			});
		});
	});
</script>

<p>{subject}</p>
<Button on:click={() => goto('/login')}>Login</Button>
