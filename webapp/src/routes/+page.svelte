<script lang="ts">
	import { client } from '$lib/api/Client';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { doesSessionExist, refreshToken, supertokensInit } from '$utils/supertokens';
	import { onMount } from 'svelte';
	let subject = '';

	onMount(async () => {
		supertokensInit();
		const Office = window.Office;
		doesSessionExist();
		await client.verification.getAll();
		Office.onReady(() => {
			console.log('Office Ready!');
			subject = Office.context.mailbox.item?.subject!;
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				doesSessionExist();
				subject = Office.context.mailbox.item?.subject!;
				console.log('Subject:', subject);
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{/if}
