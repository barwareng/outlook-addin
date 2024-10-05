<script lang="ts">
	import ContactCategoryCard from '$lib/components/reusable/ContactCategoryCard.svelte';
	import { parsed } from '$stores/views';

	$: categories = $parsed?.categories;
	let displayCategory: {
		key: string;
		name: string;
		description: string;
		emailAddresses: string[];
	}[] = [];

	const prepareContactCategories = () => {
		if (categories.flagged?.length) {
			displayCategory.push({
				key: 'flagged',
				name: 'Flagged',
				description: 'They have been flagged by other organizations or individuals',
				emailAddresses: categories.flagged
			});
		}
		if (categories.untrustedContacts?.length) {
			displayCategory.push({
				key: 'untrustedContacts',
				name: 'Untrusted',
				description: 'Yor or members of your team have flagged these contacts as untrusted',
				emailAddresses: categories.untrustedContacts
			});
		}
		if (categories.unknown?.length) {
			displayCategory.push({
				key: 'unknown',
				name: 'Uknown',
				description: 'You or you team have not interacted with these contacts',
				emailAddresses: categories.unknown
			});
		}
		if (categories.verified?.length) {
			displayCategory.push({
				key: 'verified',
				name: 'Verified',
				description: 'These contacts have verified their identity or their organization',
				emailAddresses: categories.verified
			});
		}
		if (categories.trustedContacts?.length) {
			displayCategory.push({
				key: 'trustedContacts',
				name: 'Trusted',
				description: 'Members of your team have interacted and trusted these contacts',
				emailAddresses: categories.trustedContacts
			});
		}
		if (categories.teamMembers?.length) {
			displayCategory.push({
				key: 'teamMembers',
				name: 'Team members',
				description: 'These are your colleagues or team members',
				emailAddresses: categories.teamMembers
			});
		}
	};
	$: categories && prepareContactCategories();
</script>

<div>
	<h1 class="my-1 text-lg font-semibold">Contacts in this thread</h1>
	<div class="space-y-1">
		{#each displayCategory as { key, name, description, emailAddresses }}
			<ContactCategoryCard {key} {name} {description} {emailAddresses} />
		{/each}
	</div>
</div>
