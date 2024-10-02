import { client } from '$lib/api/Client';
import type { IContactDetails } from './interfaces/contact.interface';

import { toastError, toastSuccess } from './toast';

export const parseThread = async (
	item:
		| (Office.Item &
				Office.ItemCompose &
				Office.ItemRead &
				Office.Message &
				Office.MessageCompose &
				Office.MessageRead &
				Office.Appointment &
				Office.AppointmentCompose &
				Office.AppointmentRead)
		| undefined
) => {
	try {
		if (!item) return;
		let contacts: IContactDetails[] = [];
		const recipients = item.to
			.concat(...item.cc)
			.concat(item.from)
			.concat(item.sender);
		contacts = recipients.map((recipient) => {
			return {
				email: recipient.emailAddress,
				name: recipient.displayName
			};
		});
		const categories = await client.verification.verify(contacts.flatMap((c) => c.email));
		toastSuccess(`Parsed ${JSON.stringify(categories)} categories`);
		return (contacts = [...new Set(contacts)]);
	} catch (error) {
		console.error(error);
		toastError(JSON.stringify(error));
	}
};
