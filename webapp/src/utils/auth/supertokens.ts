import SuperTokens from 'supertokens-web-js';

import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword, {
	emailPasswordSignIn
} from 'supertokens-web-js/recipe/thirdpartyemailpassword';

import { view } from '$stores/views';
import { Views } from '../interfaces/views';
import { PUBLIC_API_BASE_URL, PUBLIC_APP_NAME } from '$env/static/public';
import { toastError, toastSuccess } from '../toast';
import { browser } from '$app/environment';

export const supertokensInit = () => {
	SuperTokens.init({
		appInfo: {
			apiDomain: PUBLIC_API_BASE_URL as string,
			apiBasePath: '/auth',
			appName: PUBLIC_APP_NAME as string
		},
		recipeList: [
			Session.init({
				autoAddCredentials: true,
				tokenTransferMethod: 'header'
			}),
			ThirdPartyEmailPassword.init()
		]
	});
};

export const signinWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const response = await emailPasswordSignIn({
			formFields: [
				{
					id: 'email',
					value: email
				},
				{
					id: 'password',
					value: password
				}
			]
		});

		let emailErrors: string[] = [];
		let passwordErrors: string[] = [];
		if (response.status === 'FIELD_ERROR') {
			response.formFields?.forEach((field) => {
				if (field.id == 'email') {
					emailErrors = emailErrors.concat(field.error);
				}
				if (field.id == 'password') {
					passwordErrors = passwordErrors.concat(field.error);
				}
			});
		} else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
			passwordErrors = passwordErrors.concat('Email password combination is incorrect.');
		} else {
			await persistentSignin(email, password);
			view.set(Views.HOME);
		}
		return { emailErrors, passwordErrors };
	} catch (err: any) {
		console.error(err);
		// toastError(err);
		if (err?.status >= 400 && err?.status < 500) view.set(Views.LOGIN);
	}
};

export const persistentSignin = async (email: string, password: string) => {
	const payload = JSON.stringify({
		formFields: [
			{
				id: 'email',
				value: email
			},
			{
				id: 'password',
				value: password
			}
		]
	});
	try {
		const res = await fetch(`${PUBLIC_API_BASE_URL}/auth/signin`, {
			method: 'post',
			body: payload
		});
		const accessToken = res.headers.get('st-access-token');
		const refreshToken = res.headers.get('st-refresh-token');
		setAccessToken(accessToken!);
		setRefreshToken(refreshToken!);
	} catch (error) {
		toastError(error);
	}
};
export const setAccessToken = (token: string) => {
	if (!token || !browser) return;
	localStorage.setItem('accessToken', token);
};
export const setRefreshToken = (token: string) => {
	if (!token || !browser) return;
	localStorage.setItem('refreshToken', token);
};
export const getAccessToken = () => {
	if (!browser) return;
	return localStorage.getItem('accessToken');
};
export const getRefreshToken = () => {
	if (!browser) return;
	return localStorage.getItem('refreshToken');
};

export const doesSessionExist = () => {
	if (getAccessToken() && getRefreshToken()) {
		view.set(Views.HOME);
		return true;
	} else {
		view.set(Views.LOGIN);
		return false;
	}
};

export const refreshToken = async () => {
	try {
		const res = await fetch(`${PUBLIC_API_BASE_URL}/auth/session/refresh`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${getRefreshToken() ?? ''}`
			}
		});
		const accessToken = res.headers.get('st-access-token');
		const refreshToken = res.headers.get('st-refresh-token');
		setAccessToken(accessToken!);
		setRefreshToken(refreshToken!);
		toastSuccess('Token refreshed');
	} catch (error) {
		toastError(error);
	}
};

export const fetchUserDetailsFromJwt = () => {
	const accessToken = getAccessToken();
	const body = accessToken?.split('.')[1];
	const base64 = body?.replace(/-/g, '+')?.replace(/_/g, '/');
	if (!base64) return;
	return JSON.parse(atob(base64));
};

export const logout = async () => {
	await Session.signOut();
	view.set(Views.LOGIN);
	if (!browser) return;
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};
