<script lang="ts">
	import Contact from '$lib/components/reusable/Contact.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { contactCategory, contactListKey, parsed, view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { Undo } from 'lucide-svelte';
	let key: string;
	$: key = $contactListKey;
	$: contacts = $parsed.categories[key]?.map((email) => {
		const contact = $parsed.contacts.find((contact) => contact.email === email);
		return contact;
	});
	$: console.log('Contacts', contacts, key);
</script>

<div>
	<div class="flex items-center gap-x-2">
		<Button
			on:click={() => ($view = Views.HOME)}
			variant="ghost"
			class="flex items-center gap-x-1 px-0"
		>
			<Undo class="h-4 w-4" />
		</Button>
		<h2 class="text-lg font-semibold">{$contactCategory} contacts</h2>
	</div>
	{#if contacts?.length}
		{#each contacts as contact}
			<Contact {contact} />
		{/each}
	{/if}
</div>
