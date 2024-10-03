<script lang="ts">
	import ContactCategoryCard from '$lib/components/reusable/ContactCategoryCard.svelte';

	import type { IContactCategories, IContactDetails } from '$utils/interfaces/contact.interface';
	export let contactDetails: IContactDetails[] = [];

	export let categories: IContactCategories;
	let displayCategory: { name: string; description: string; count: number }[] = [];
	$: console.log(categories);
	const prepareContactCategories = () => {
		categories &&
			Object.entries(categories).forEach(([key, value]) => {
				switch (key) {
					case 'flagged':
						if (value?.length)
							displayCategory.push({
								name: 'Flagged',
								description: 'They have been flagged by other organizations or individuals',
								count: value.length
							});
						break;
					case 'untrustedContacts':
						if (value?.length)
							displayCategory.push({
								name: 'Untrusted',
								description: 'Yor or members of your team have flagged these contacts as untrusted',
								count: value.length
							});
						break;
					case 'unknown':
						if (value?.length)
							displayCategory.push({
								name: 'Uknown',
								description: 'You or you team have not interacted with these contacts',
								count: value.length
							});
						break;
					case 'verified':
						if (value?.length)
							displayCategory.push({
								name: 'Verified',
								description: 'These contacts have verified their identity or their organization',
								count: value.length
							});
						break;
					case 'trustedContacts':
						if (value?.length)
							displayCategory.push({
								name: 'Trusted',
								description: 'Members of your team have interacted and trusted these contacts',
								count: value.length
							});
						break;
					case 'teamMembers':
						if (value?.length)
							displayCategory.push({
								name: 'Team members',
								description: 'These are your colleagues or team members',
								count: value.length
							});
						break;
					default:
						break;
				}
			});
	};
	$: prepareContactCategories();
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
