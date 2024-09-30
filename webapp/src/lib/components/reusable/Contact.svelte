<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { IContactDetails } from '$utils/interfaces/contact.interface';
	import Avatar from './images/Avatar.svelte';

	export let contact: IContactDetails & { isTrusted: boolean };
</script>

<Card.Root class="cursor-pointer p-2" on:on:click>
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
