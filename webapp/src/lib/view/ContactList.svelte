<script lang="ts">
	import Contact from '$lib/components/reusable/Contact.svelte';
	import EmptyState from '$lib/components/reusable/EmptyState.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { contactCategory, contactListKey, parsed, view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { Undo } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	let key: string;
	$: key = $contactListKey;
	$: contacts = $parsed.categories[key]?.map((email) =>
		$parsed.contacts.find((contact) => contact.email === email)
	);
</script>

<div transition:slide>
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

	<div class="space-y-1">
		{#if contacts?.length}
			{#each contacts as contact}
				<Contact {contact} />
			{/each}
		{:else}
			<EmptyState title="No contacts" subtitle="It looks like you've cleared this list.">
				<Button on:click={() => ($view = Views.HOME)}>Go Home</Button>
			</EmptyState>
		{/if}
	</div>
</div>
