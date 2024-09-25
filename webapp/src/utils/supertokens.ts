import SuperTokens from 'supertokens-web-js';

import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword, {
	emailPasswordSignIn
} from 'supertokens-web-js/recipe/thirdpartyemailpassword';

import { view } from '$stores/views';
import { Views } from './interfaces/views';
import { PUBLIC_API_BASE_URL, PUBLIC_APP_NAME } from '$env/static/public';
import { toastError } from './toast';
import { toast } from 'svelte-sonner';

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
				autoAddCredentials: true
				// sessionTokenBackendDomain: (VITE_SUPERTOKENS_COOKIE_DOMAIN as string) ?? undefined,
				// sessionTokenFrontendDomain: (VITE_SUPERTOKENS_COOKIE_DOMAIN as string) ?? undefined,
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
			// TODO display error
			passwordErrors = passwordErrors.concat('Email password combination is incorrect.');
			toastError('Email password combination is incorrect.');
		} else {
			view.set(Views.HOME);
		}
		return { emailErrors, passwordErrors };
	} catch (err: any) {
		console.log(err);
		toastError(err);
		if (err?.status >= 400 && err?.status < 500) view.set(Views.LOGIN);
	}
};
export const logout = async () => {
	await Session.signOut();
	view.set(Views.LOGIN);
};
