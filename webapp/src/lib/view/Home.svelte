<script lang="ts">
	import ContactCategoryCard from '$lib/components/reusable/ContactCategoryCard.svelte';
	import Card from '$lib/components/ui/card/card.svelte';

	import type { IContactCategories, IContactDetails } from '$utils/interfaces/contact.interface';
	export let contactDetails: IContactDetails[] = [];

	export let categories: IContactCategories;
	let displayCategory: { name: string; description: string; count: number }[] = [];

	const prepareContactCategories = () => {
		if (categories.flagged) {
			displayCategory.push({
				name: 'Flagged',
				description: 'They have been flagged by other organizations or individuals',
				count: categories.flagged.length
			});
		}
		if (categories.untrustedContacts) {
			displayCategory.push({
				name: 'Untrusted',
				description: 'Yor or members of your team have flagged these contacts as untrusted',
				count: categories.untrustedContacts.length
			});
		}
		if (categories.unknown) {
			displayCategory.push({
				name: 'Uknown',
				description: 'You or you team have not interacted with these contacts',
				count: categories.unknown.length
			});
		}
		if (categories.verified) {
			displayCategory.push({
				name: 'Verified',
				description: 'These contacts have verified their identity or their organization',
				count: categories.verified.length
			});
		}
		if (categories.trustedContacts) {
			displayCategory.push({
				name: 'Trusted',
				description: 'Members of your team have interacted and trusted these contacts',
				count: categories.trustedContacts.length
			});
		}
		if (categories.teamMembers) {
			displayCategory.push({
				name: 'Team members',
				description: 'These are your colleagues or team members',
				count: categories.teamMembers.length
			});
		}
	};
	$: categories && prepareContactCategories();
</script>

<div>
	<h1 class="my-1 text-lg font-semibold">Contacts in this thread</h1>
	<div class="space-y-1">
		{#each displayCategory as category}
			<ContactCategoryCard
				name={category.name}
				description={category.description}
				count={category.count}
			/>
		{/each}
	</div>
</div>
