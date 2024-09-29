import { toastError } from './toast';
import { PUBLIC_MS_APP_ID } from '$env/static/public';
import {
	PublicClientApplication,
	InteractionType,
	type AuthenticationResult
} from '@azure/msal-browser';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { Client } from '@microsoft/microsoft-graph-client';
export const pca = new PublicClientApplication({
	auth: {
		clientId: PUBLIC_MS_APP_ID,
		authority: 'https://login.microsoftonline.com/common',
		redirectUri: `http://localhost:5175` // Must be registered as "spa" type.
	},
	cache: {
		cacheLocation: 'localStorage' // Needed to avoid a "login required" error.
	}
});
export const getGraphData = async (url: string) => {
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('msalAccessToken')}`
			}
		});
		const data = await res.json();
		return data;
		// toastSuccess(JSON.stringify(data, null, 2));
	} catch (error) {
		toastError(error);
	}
};
export let graphClient: Client;
export const msGraph = async (type: 'popup' | 'redirect' = 'popup') => {
	await pca.initialize();
	let authResult: AuthenticationResult | undefined | null;
	if (type === 'redirect') {
		authResult = await pca.handleRedirectPromise();
		if (!authResult) {
			// toastError('No authResult');
			await pca.acquireTokenRedirect({
				scopes: ['User.Read', 'Mail.Read']
			});
		}
	} else {
		authResult = await pca.acquireTokenPopup({
			scopes: ['User.Read', 'Mail.Read']
		});
	}
	const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
		account: authResult.account,
		interactionType: InteractionType.Silent,
		scopes: ['User.Read', 'Mail.Read']
	});
	graphClient = Client.initWithMiddleware({ authProvider: authProvider });
};
