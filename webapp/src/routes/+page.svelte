<script lang="ts">
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { onMount } from 'svelte';
	let subject = '';
	onMount(() => {
		const Office = window.Office;
		Office.onReady(() => {
			console.log('Office Ready!');
			subject = Office.context.mailbox.item?.subject!;
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, () => {
				subject = Office.context.mailbox.item?.subject!;
				console.log('Subject:', subject);
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{/if}
