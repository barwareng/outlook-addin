<script lang="ts">
	import ContactCategoryCard from '$lib/components/reusable/ContactCategoryCard.svelte';
	import TeamSwitcher from '$lib/components/reusable/TeamSwitcher.svelte';
	import type { IContactDetails } from '$utils/interfaces/contact.interface';
	export let contactDetails: IContactDetails[] = [];

	export let categories = [
		{
			name: 'Category 1',
			description: 'Description 1',
			count: 10
		},
		{
			name: 'Category 2',
			description: 'Description 2',
			count: 20
		},
		{
			name: 'Category 3',
			description: 'Description 3',
			count: 30
		}
	];
</script>

<div>
	<TeamSwitcher />
	<h1 class="my-1 text-lg font-semibold">Contacts in this thread</h1>
	<div class="space-y-1">
		<!-- {#each contactDetails as contact}
			{contact.name}
			{contact.email}
		{/each} -->
		{#each categories as category}
			<ContactCategoryCard
				name={category.name}
				description={category.description}
				count={category.count}
			/>
		{/each}
	</div>
</div>
