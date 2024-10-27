<script lang="ts">
	import AuthenticatedWrapper from '$lib/view/AuthenticatedWrapper.svelte';
	import ContactList from '$lib/view/ContactList.svelte';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { contactCategory, contactListKey, parsed, view } from '$stores/views';
	import { getAccessToken, getRefreshToken, supertokensInit } from '$utils/auth/supertokens';

	import { Views } from '$utils/interfaces/views';
	import { parseThread } from '$utils/thread-parser';

	import { doesSessionExist } from 'supertokens-web-js/recipe/session';

	import { onMount } from 'svelte';

	onMount(async () => {
		supertokensInit();
		doesSessionExist();

		Office.onReady(async () => {
			if (!getAccessToken() || !getRefreshToken()) {
				return view.set(Views.LOGIN);
			}
			$parsed = (await parseThread(Office.context.mailbox.item!))!;

			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				$view = Views.HOME;
				$contactListKey = '';
				$contactCategory = '';
				$parsed = (await parseThread(Office.context.mailbox.item!))!;
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
