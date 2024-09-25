<script lang="ts">
	import { PUBLIC_PLATFORM_APP_BASE_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { signinWithEmailAndPassword } from '$utils/supertokens';
	import { toastSuccess } from '$utils/toast';
	import { onMount } from 'svelte';
	let email: string;
	let password: string;
</script>

<Card.Root class="mx-auto max-w-sm bg-yellow-300">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="mail@example.com" required bind:value={email} />
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
			</div>
			<Button
				class="w-full"
				on:click={() => {
					toastSuccess('Logging in...');
					signinWithEmailAndPassword(email, password);
				}}>Login</Button
			>
		</div>
		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="{PUBLIC_PLATFORM_APP_BASE_URL}/signup" target="_blank" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
