<script lang="ts">
	import { client } from '$lib/api/Client';
	import Contact from '$lib/components/reusable/Contact.svelte';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { supertokensInit } from '$utils/auth/supertokens';
	import type { IContactDetails } from '$utils/interfaces/contact.interface';
	import type { IMessage } from '$utils/interfaces/message.interface';
	import { Views } from '$utils/interfaces/views';
	import { parseThread } from '$utils/thread-parser';
	import { toastSuccess } from '$utils/toast';
	import { doesSessionExist } from 'supertokens-web-js/recipe/session';

	import { onMount } from 'svelte';
	let messages: Partial<IMessage>[];
	let error: any;
	let contacts: IContactDetails[] = [];
	onMount(async () => {
		const values = [
			'upus.barcleo@gmail.com',
			'jiwer31259@eixdeal.com',
			'hitiyat277@foraro.com',
			'fwerfer',
			'support@acme.com',
			'+12015558949'
		];
		try {
			const categories = await client.verification.verifyPublic(values);
			console.log('Categories', categories);
		} catch (error) {
			console.log('Error fetching value', error);
		}
		supertokensInit();
		doesSessionExist();

		Office.onReady(async () => {
			// toastSuccess('Office is ready');
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
<!-- {#if contacts?.length}
	{#each contacts as contact}
		<Contact {contact} />
	{/each}
{/if} -->
