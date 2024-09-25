<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-svelte';

	import { page } from '$app/stores';
	import { closeAndRefocusTrigger, getTeamId, setTeamId } from '$utils';
	import { invalidateAll } from '$app/navigation';
	import type { ITeam } from '$utils/interfaces/teams.interface';
	import Avatar from './images/Avatar.svelte';
	import { PUBLIC_PLATFORM_APP_BASE_URL } from '$env/static/public';
	import { fetchUserDetailsFromJwt } from '$utils/supertokens';
	import { onMount } from 'svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	let open = false;
	let teams: Partial<ITeam>[];
	let selectedTeam: Partial<ITeam> | undefined;
	const changeTeam = async (team: Partial<ITeam>) => {
		await setTeamId(team.id!);
		selectedTeam = team;
		await invalidateAll();
	};
	onMount(async () => {
		let userData = fetchUserDetailsFromJwt();
		teams = userData.teams;
		selectedTeam = teams.find((team) => team.id === getTeamId());
	});
</script>

{#if teams && teams?.length > 0}
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				aria-label="Select a team"
				class={cn('mb-4 w-full justify-between rounded-full', className)}
			>
				{#key selectedTeam}
					<Avatar src="" seed={selectedTeam?.id} class="mr-2 h-5 w-5" />
				{/key}
				{selectedTeam?.name || ''}
				<ChevronsUpDownIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<!-- TODO adjust with relative to trigger -->
		<Popover.Content class="p-0">
			<Command.Root>
				<Command.Input placeholder="Search team..." />
				<Command.List>
					<Command.Empty>No team found.</Command.Empty>
					<Command.Group heading="Teams">
						{#each teams as team}
							<Command.Item
								onSelect={() => {
									changeTeam(team);
									open = closeAndRefocusTrigger(ids.trigger);
								}}
								value={team.name}
								class="text-sm"
							>
								<Avatar src="" seed={team?.id} class="mr-2 h-5 w-5" />
								{team.name}
								<CheckIcon
									class={cn('ml-auto h-4 w-4', selectedTeam?.id !== team.id && 'text-transparent')}
								/>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
{:else}
	<Button class="mb-4 w-full" href={PUBLIC_PLATFORM_APP_BASE_URL} target="_blank">
		<PlusCircleIcon class="mr-2 h-5 w-5" />
		Create Team</Button
	>
{/if}
