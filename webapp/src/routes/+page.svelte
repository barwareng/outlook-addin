<script lang="ts">
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { checkSession, supertokensInit } from '$utils/supertokens';
	import { onMount } from 'svelte';
	let subject = '';
	onMount(async () => {
		supertokensInit();
		const Office = window.Office;
		await checkSession();
		Office.onReady(() => {
			console.log('Office Ready!');
			subject = Office.context.mailbox.item?.subject!;
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				await checkSession();
				subject = Office.context.mailbox.item?.subject!;
				console.log('Subject:', subject);
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{/if}
