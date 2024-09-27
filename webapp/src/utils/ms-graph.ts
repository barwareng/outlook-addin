import { PUBLIC_MS_APP_ID } from '$env/static/public';
import * as msal from '@azure/msal-browser';

const msalConfig = {
	auth: {
		clientId: PUBLIC_MS_APP_ID,
		authority: 'https://login.microsoftonline.com/your-tenant-id',
		redirectUri: 'http://localhost:5175/redirect'
	}
};

export const msalInstance = new msal.PublicClientApplication(msalConfig);
