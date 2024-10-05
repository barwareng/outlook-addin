<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { IContactDetails } from '$utils/interfaces/contact.interface';
	import Button from '$lib/components/ui/button/button.svelte';
	import Avatar from './images/Avatar.svelte';
	import ContactActions from './ContactActions.svelte';
	import { parsed } from '$stores/views';

	export let contact: IContactDetails;
	const isTrusted =
		$parsed.categories.trustedContacts?.includes(contact.email) ||
		$parsed.categories.teamMembers?.includes(contact.email) ||
		$parsed.categories.verified?.includes(contact.email);
</script>

<Card.Root class="relative cursor-pointer p-3" on:on:click>
	{#if !isTrusted}
		<div class="absolute right-2 top-2">
			<ContactActions bind:contact />
		</div>
	{/if}
	<div class="flex items-start gap-x-2">
		<div class="relative">
			<Avatar seed={contact.email} src="" class="h-8 w-8" />
		</div>
		<div>
			<h1 class="font-bold">{contact.name}</h1>
			<p class="text-sm text-gray-500">{contact.email}</p>
		</div>
	</div>
</Card.Root>
