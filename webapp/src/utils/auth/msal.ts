import { toastError } from '$utils/toast';
import { PublicClientApplication } from '@azure/msal-browser';
import { PUBLIC_MS_APP_ID } from '$env/static/public';
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
export const msalLogin = async (type: 'popup' | 'redirect' = 'popup') => {
	await pca.initialize();
	if (type === 'popup') {
		await popupLogin();
	} else {
		await redirectLogin();
	}
};

const redirectLogin = async () => {
	try {
		const response = await pca.handleRedirectPromise();
		if (response) {
			localStorage.setItem('msalAccessToken', response.accessToken);
		} else {
			await pca.loginRedirect({
				scopes: ['user.read', 'mail.read']
			});
		}
	} catch (error) {
		console.log('msalLoginError', error);
		toastError(error);
	}
};

const popupLogin = async () => {
	try {
		const response = await pca.loginPopup({
			scopes: ['user.read', 'mail.read']
		});
		localStorage.setItem('msalAccessToken', response.accessToken);
	} catch (error) {
		console.log('msalLoginError', error);
		toastError(error);
	}
};
