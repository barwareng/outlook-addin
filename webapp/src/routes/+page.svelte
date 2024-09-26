<script lang="ts">
	import { client } from '$lib/api/Client';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import type { IContactDetails } from '$utils/interfaces/contact.interface';
	import { Views } from '$utils/interfaces/views';
	import { doesSessionExist, supertokensInit } from '$utils/supertokens';
	import { parseThread } from '$utils/thread-parser';
	import { toastError, toastSuccess } from '$utils/toast';
	import { onMount } from 'svelte';
	let subject = '';
	let contacts: IContactDetails[] = [];
	onMount(async () => {
		supertokensInit();
		doesSessionExist();

		Office.onReady(() => {
			toastSuccess('Office is ready');

			contacts = parseThread(Office.context.mailbox.item);
			Office.context.mailbox.addHandlerAsync(
				Office.EventType.ItemChanged,
				(contacts = parseThread(Office.context.mailbox.item))
			);
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else if $view === Views.HOME}
	<Home />
{/if}

<div class="bg-primary mt-1 space-y-1">
	{#each contacts || [] as contact}
		<div class="bg-background rounded p-2">
			{contact.name}
			{contact.email}
		</div>
	{/each}
</div>
