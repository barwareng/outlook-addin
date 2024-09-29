<script lang="ts">
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import type { IMessage } from '$utils/interfaces/message.interface';
	import { Views } from '$utils/interfaces/views';
	import { graphClient } from '$utils/ms-graph';
	import { toastError, toastSuccess } from '$utils/toast';

	import { onMount } from 'svelte';
	let message: Partial<IMessage>;
	onMount(async () => {
		Office.onReady(() => {
			// toastSuccess('Office is ready');
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				// console.log(args);
				const id = Office.context.mailbox.item?.itemId;
				// toastSuccess(`Item ID: ${id}`);
				try {
					message = await graphClient
						.api(`/me/messages/${id}`)
						.select('subject,sender,from,toRecipients,ccRecipients,bccRecipients,replyTo')
						.get();
					// toastSuccess(JSON.stringify(message));
				} catch (error) {
					toastError(JSON.stringify(error));
				}
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else if $view === Views.HOME}
	<Home />
{/if}

{#if message}
	<div class="space-y-1">
		{#if message.subject}
			<p>Subject: {message.subject}</p>
		{/if}
		{#if message.sender}
			<p>Sender: {message.sender.emailAddress.name} - {message.sender.emailAddress.address}</p>
		{/if}
	</div>
{/if}
