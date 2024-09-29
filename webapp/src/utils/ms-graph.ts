import { toastError, toastSuccess } from './toast';

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
