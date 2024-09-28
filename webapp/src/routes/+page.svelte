<script lang="ts">
	import { PUBLIC_MS_APP_ID } from '$env/static/public';
	import { client } from '$lib/api/Client';
	import Home from '$lib/view/Home.svelte';
	import Login from '$lib/view/Login.svelte';
	import { view } from '$stores/views';
	import { Views } from '$utils/interfaces/views';
	import { doesSessionExist, supertokensInit } from '$utils/supertokens';
	import { parseThread } from '$utils/thread-parser';
	import { toastError, toastSuccess } from '$utils/toast';
	import { PublicClientApplication } from '@azure/msal-browser';
	import { onMount } from 'svelte';
	let error = '';
	onMount(async () => {
		supertokensInit();
		const Office = window.Office;
		doesSessionExist();

		Office.onReady(async () => {
			toastSuccess('Office is ready');
			const pca = new PublicClientApplication({
				auth: {
					clientId: PUBLIC_MS_APP_ID,
					authority: 'https://login.microsoftonline.com/common',
					redirectUri: `http://localhost:5175` // Must be registered as "spa" type.
				},
				cache: {
					cacheLocation: 'localStorage' // Needed to avoid a "login required" error.
				}
			});
			await pca.initialize();

			try {
				const response = await pca.handleRedirectPromise();
				toastSuccess(`Redirect response: ${response}`);

				if (response) {
					localStorage.setItem('msalAccessToken', response.accessToken);
					toastSuccess('Login successful');
				} else {
					const res = await pca.loginPopup({
						scopes: ['user.read', 'mail.read']
					});
					localStorage.setItem('msalAccessToken', res.accessToken);
					// toastError(`Login response: ${JSON.stringify(res, null, 2)}`);
				}
			} catch (error) {
				// toastError(JSON.stringify(error, null, 2));
				error = JSON.stringify(error, null, 2);
			}
			parseThread(Office.context.mailbox.item);
			Office.context.mailbox.addHandlerAsync(Office.EventType.ItemChanged, async () => {
				let keys = Object.entries(localStorage);
				toastSuccess(`Keys: ${JSON.stringify(keys, null, 2)}`);
				parseThread(Office.context.mailbox.item);
			});
		});
	});
</script>

{#if $view === Views.LOGIN}
	<Login />
{:else if $view === Views.HOME}
	<Home />
{/if}

{#if error}
	<p>{error}</p>
{/if}
