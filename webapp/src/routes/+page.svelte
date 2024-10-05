<script lang="ts">
	import Contact from '$lib/components/reusable/Contact.svelte';
	import AuthenticatedWrapper from '$lib/view/AuthenticatedWrapper.svelte';
	import ContactList from '$lib/view/ContactList.svelte';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { contactCategory, contactListKey, parsed, view } from '$stores/views';
	import { getAccessToken, getRefreshToken, supertokensInit } from '$utils/auth/supertokens';
	import type { IContactCategories, IContactDetails } from '$utils/interfaces/contact.interface';
	import type { IMessage } from '$utils/interfaces/message.interface';
	import { Views } from '$utils/interfaces/views';
	import { parseThread } from '$utils/thread-parser';
	import { toastSuccess } from '$utils/toast';
	import { doesSessionExist } from 'supertokens-web-js/recipe/session';

	import { onMount } from 'svelte';
	// let parsed: { contacts: IContactDetails[]; categories: IContactCategories };
	onMount(async () => {
		supertokensInit();
		doesSessionExist();

		Office.onReady(async () => {
			// toastSuccess('Office is ready');
			// await msGraph();
			if (!getAccessToken() || !getRefreshToken()) {
				return view.set(Views.LOGIN);
			}
			$parsed = await parseThread(Office.context.mailbox.item!);
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				$view = Views.HOME;
				$contactListKey = '';
				$contactCategory = '';
				$parsed = await parseThread(Office.context.mailbox.item!);
				// console.log('Parsed', parsed);
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else}
	{#key $parsed}
		<AuthenticatedWrapper>
			{#if $view === Views.HOME}
				<Home />
			{:else if $view === Views.CONTACTS}
				{#if $parsed.contacts?.length}
					<ContactList />
				{/if}
			{/if}
		</AuthenticatedWrapper>
	{/key}
{/if}
<!-- {#if parsed.contacts?.length}
	{#each contacts as contact}
		<Contact {contact} />
	{/each}
{/if} -->
