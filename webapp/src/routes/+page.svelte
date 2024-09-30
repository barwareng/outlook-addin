<script lang="ts">
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import type { IContactDetails } from '$utils/interfaces/contact.interface';
	import type { IMessage } from '$utils/interfaces/message.interface';
	import { Views } from '$utils/interfaces/views';
	import { parseThread } from '$utils/thread-parser';
	import { toastSuccess } from '$utils/toast';

	import { onMount } from 'svelte';
	let messages: Partial<IMessage>[];
	let error: any;
	let contacts: IContactDetails[] | undefined = [];
	onMount(async () => {
		Office.onReady(async () => {
			toastSuccess('Office is ready');
			// await msGraph();
			contacts = await parseThread(Office.context.mailbox.item!);
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				contacts = await parseThread(Office.context.mailbox.item!);
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else if $view === Views.HOME}
	<Home />
{/if}
{#if contacts?.length}
	<p>{contacts?.length}</p>
{/if}
{#if messages?.length}
	{#each messages as message}
		<div class="space-y-1">
			{#if message.subject}
				<p>Subject: {message.subject}</p>
			{/if}
			{#if message.sender}
				<p>Sender: {message.sender.emailAddress.name} - {message.sender.emailAddress.address}</p>
			{/if}
		</div>
	{/each}
{/if}
