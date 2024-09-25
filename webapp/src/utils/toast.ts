import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';
export const toastError = async (error: any) => {
	if (!browser) return;
	let errorString;
	if (typeof error == 'string') {
		errorString = error;
	} else if (error?.isSuperTokensGeneralError === true) {
		errorString = error.message;
	} else if (error?.status >= 400 && error?.status < 500) {
		errorString = await error.json();
	} else errorString = 'Something went wrong. Please try again.';
	toast.error(errorString);
};
export const toastSuccess = (message: string) => {
	toast.success(message);
};
