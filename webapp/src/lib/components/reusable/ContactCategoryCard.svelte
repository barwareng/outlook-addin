<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import Avatar from './images/Avatar.svelte';
	export let count = 0;
	export let name = '';
	export let description = '';
</script>

<Card.Root
	class="cursor-pointer p-2 "
	on:click={() => {
		$view = Views.CONTACTS;
	}}
>
	<div class="flex items-start gap-x-2">
		<div class="relative">
			<Avatar seed={name} src="" class="h-8 w-8" />
			<div
				class="bg-secondary absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0.5 text-[8px]"
			>
				<span class=" h-full w-full rounded-full bg-green-700 text-center">{count}</span>
			</div>
		</div>
		<div>
			<h1 class="font-bold">{name}</h1>
			<p class="text-sm text-gray-500">{description}</p>
		</div>
	</div>
</Card.Root>
