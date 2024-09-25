<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Avatar from './images/Avatar.svelte';
	export let count = 0;
	export let name = '';
	export let description = '';
</script>

<Card.Root class="cursor-pointer p-2" on:on:click>
	<div class="flex items-start gap-x-2">
		<div class="relative">
			<Avatar seed={name} src="" class="h-8 w-8" />
		</div>
		<div>
			<h1 class="font-bold">{name}</h1>
			<p class="text-sm text-gray-500">{description}</p>
		</div>
	</div>
</Card.Root>
