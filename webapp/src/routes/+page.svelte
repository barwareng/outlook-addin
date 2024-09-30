<script lang="ts">
	import Contact from '$lib/components/reusable/Contact.svelte';
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
	let contacts: IContactDetails[] = [];
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
	{#each contacts as contact}
		<Contact {contact} />
	{/each}
{/if}
