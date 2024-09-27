<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { msalInstance } from '$utils/ms-graph';

	export let data: PageData;
	onMount(() => {
		// Login user and acquire token
		msalInstance.loginPopup().then((response) => {
			const accessToken = response.accessToken;
			// Use accessToken in the following steps to call Microsoft Graph API
		});
	});
</script>
