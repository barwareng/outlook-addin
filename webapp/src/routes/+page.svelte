<script lang="ts">
	import { client } from '$lib/api/Client';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { doesSessionExist, supertokensInit } from '$utils/supertokens';
	import { parseThread } from '$utils/thread-parser';
	import { toastError, toastSuccess } from '$utils/toast';
	import { onMount } from 'svelte';
	let subject = '';

	onMount(async () => {
		supertokensInit();
		const Office = window.Office;
		doesSessionExist();
		Office.onReady(() => {
			toastSuccess('Office is ready');

			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				parseThread(Office.context.mailbox.item);
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else if $view === Views.HOME}
	<Home />
{/if}
