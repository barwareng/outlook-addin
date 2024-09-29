<script lang="ts">
	import { client } from '$lib/api/Client';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { getGraphData } from '$utils/ms-graph';
	import { doesSessionExist, supertokensInit } from '$utils/auth/supertokens';
	import { parseThread } from '$utils/thread-parser';
	import { toastError, toastSuccess } from '$utils/toast';

	import { onMount } from 'svelte';
	import { msalLogin } from '$utils/auth/msal';
	let error = '';
	let data: any;
	onMount(async () => {
		// supertokensInit();
		// const Office = window.Office;
		// doesSessionExist();
		await msalLogin('redirect');
		if (localStorage.getItem('msalAccessToken')) {
			const res = (await getGraphData(`https://graph.microsoft.com/v1.0/me/messages`))?.value;
			data = res
				.map((message) => {
					return {
						// id: message.id,
						subject: message.subject,
						sender: message.sender.emailAddress.name,
						from: message.bccReceipients,
						to: message.from,
						cc: message.ccRecipients
					};
				})
				.flat();
			console.log(data);
		}
		// Office.onReady(async () => {
		// 	toastSuccess('Office is ready');

		// 	Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
		// 		const res = (await getGraphData(`https://graph.microsoft.com/v1.0/me/messages`))?.value;
		// 		data = res?.map;
		// 	});
		// });
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else if $view === Views.HOME}
	<Home />
{/if}

<!-- {#if data}
	<p>{JSON.stringify(data, null, 2)}</p>
{/if} -->
