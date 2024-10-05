<script lang="ts">
	import { client } from '$lib/api/Client';
	import ButtonLoadingSpinner from '$lib/components/reusable/loading-spinners/ButtonLoadingSpinner.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { toastError, toastSuccess } from '$utils/toast';
	import { CONTACT, type IContactDetails } from '$utils/interfaces/contact.interface';
	import { parsed } from '$stores/views';
	export let contact: IContactDetails;
	export let action: 'Trust' | 'Untrust';
	let reasonForUntrusting: string;
	let updatingTrustworthiness = false;
	export let open: boolean;
	const updateTrustworthiness = async () => {
		try {
			updatingTrustworthiness = true;
			await client.contacts.create({
				contact: {
					value: contact.email,
					label: contact.name,
					type: CONTACT.EMAIL,
					domain: contact.email.split('@')[1],
					category: 'General'
				},
				teamContact: {
					isTrusted: action == 'Trust' ? true : false,
					reasonForUntrusting
				}
			});

			updatingTrustworthiness = false;
			open = false;
			// Update parsed store categories removing the value from a matching category
			removeContact(contact.email);
			if (action == 'Trust') {
				$parsed.categories.trustedContacts?.push(contact.email);
			} else {
				$parsed.categories.untrustedContacts?.push(contact.email);
			}
			toastSuccess(`Contact has been marked ${action == 'Trust' ? 'trusted' : 'untrusted'}.`);
		} catch (error) {
			updatingTrustworthiness = false;
			open = false;
			console.log(error);
			toastError(error);
		}
	};

	const removeContact = (email: string) => {
		for (const category in $parsed.categories) {
			if ($parsed.categories.hasOwnProperty(category)) {
				// Filter the array to exclude the email if found
				$parsed.categories[category] = $parsed.categories[category]?.filter(
					(item) => item !== email
				);
			}
		}
	};
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			size="sm"
			class="flex w-full justify-start px-2 text-sm font-normal"
		>
			{action}
		</Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				<!-- TODO better wording -->
				This action will change how this contact is displayed to team.
			</AlertDialog.Description>
		</AlertDialog.Header>
		{#if action == 'Untrust'}
			<div class="flex-1 space-y-1">
				<Label class="text-xs">Why?</Label>
				<Textarea
					bind:value={reasonForUntrusting}
					class="resize-none placeholder:text-xs"
					placeholder="Reason not to trust this contact"
				/>
			</div>
		{/if}
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action disabled={updatingTrustworthiness} on:click={updateTrustworthiness}>
				<ButtonLoadingSpinner bind:state={updatingTrustworthiness} />
				{action}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
