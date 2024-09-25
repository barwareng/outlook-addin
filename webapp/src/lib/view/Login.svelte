<script lang="ts">
	import { PUBLIC_PLATFORM_APP_BASE_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { signinWithEmailAndPassword } from '$utils/supertokens';
	import { TriangleAlertIcon } from 'lucide-svelte';

	let email: string;
	let password: string;
	let emailErrors: string[] = [];
	let passwordErrors: string[] = [];
	const signIn = async () => {
		const res = await signinWithEmailAndPassword(email, password);
		emailErrors = res?.emailErrors!;
		passwordErrors = res?.passwordErrors!;
	};
</script>

<Card.Root class="mx-auto max-w-sm ">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="mail@example.com" required bind:value={email} />
				{#if emailErrors.length}
					{#each emailErrors as error}
						<div class="text-destructive flex items-center gap-x-1 text-xs">
							<TriangleAlertIcon class="h-3 w-3" />
							<p class="">{error}</p>
						</div>
					{/each}
				{/if}
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
					<a
						href="{PUBLIC_PLATFORM_APP_BASE_URL}/reset-password"
						target="_blank"
						class="ml-auto inline-block text-sm underline"
					>
						Forgot your password?
					</a>
				</div>
				<Input id="password" type="password" required bind:value={password} />
				{#if passwordErrors.length}
					{#each passwordErrors as error}
						<div class="text-destructive flex items-center gap-x-1 text-xs">
							<TriangleAlertIcon class="h-3 w-3" />
							<p class="">{error}</p>
						</div>
					{/each}
				{/if}
			</div>
			<Button class="w-full" disabled={!email || !password} on:click={signIn}>Login</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="{PUBLIC_PLATFORM_APP_BASE_URL}/signup" target="_blank" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
