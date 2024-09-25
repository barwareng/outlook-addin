<script lang="ts">
	import { client } from '$lib/api/Client';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { doesSessionExist, supertokensInit } from '$utils/supertokens';
	import { toastError, toastSuccess } from '$utils/toast';
	import { onMount } from 'svelte';
	let subject = '';

	onMount(async () => {
		supertokensInit();
		const Office = window.Office;
		doesSessionExist();
		await client.verification.getAll();
		Office.onReady(() => {
			toastSuccess('Office is ready');
			subject = Office.context.mailbox.item?.subject!;
			toastError(JSON.stringify(Office.context.mailbox.item));
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				toastError('fgjlksdjh');
				if (!doesSessionExist()) return;
				subject = Office.context.mailbox.item?.subject!;
				toastSuccess('Subject:', subject);
				const item = Office.context.mailbox.item;
				item?.cc.getAsync((result) => {
					toastSuccess(`CC: ${result.value}`);
				});
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else if $view === Views.HOME}
	<Home />
{/if}
