import { client } from '$lib/api/Client';
import type { IContactCategories, IContactDetails } from './interfaces/contact.interface';

import { toastError } from './toast';

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
): Promise<{ contacts: IContactDetails[]; categories: IContactCategories } | null> => {
	let contacts: IContactDetails[] = [];
	let categories: IContactCategories = {};
	try {
		if (!item) return null;
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
		// Remove duplicates objects from contacts
		contacts = Array.from(new Map(contacts.map((contact) => [contact.email, contact])).values());

		categories = await client.verification.verify(contacts.flatMap((c) => c.email));
	} catch (error) {
		console.error('Thread parser', error);
		toastError(error);
	}
	return { contacts, categories };
};
