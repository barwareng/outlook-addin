import SuperTokens from 'supertokens-web-js';

import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword, {
	emailPasswordSignIn
} from 'supertokens-web-js/recipe/thirdpartyemailpassword';

import { view } from '$stores/views';
import { Views } from './interfaces/views';
import { PUBLIC_API_BASE_URL, PUBLIC_APP_NAME } from '$env/static/public';
import { toastError, toastSuccess } from './toast';

// recei
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
		toastError(err);
		if (err?.status >= 400 && err?.status < 500) view.set(Views.LOGIN);
	}
};
export const checkSession = async () => {
	if (getAccessToken() && getRefreshToken()) {
		view.set(Views.HOME);
		// toastSuccess('Session exists');
	} else {
		// toastError('Session does not exist');
		view.set(Views.LOGIN);
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
	if (!token) return;
	localStorage.setItem('accessToken', token);
};
export const setRefreshToken = (token: string) => {
	if (!token) return;
	localStorage.setItem('accessToken', token);
};
export const getAccessToken = () => {
	return localStorage.getItem('accessToken');
};
export const getRefreshToken = () => {
	return localStorage.getItem('refreshToken');
};
export const logout = async () => {
	await Session.signOut();
	view.set(Views.LOGIN);
};
