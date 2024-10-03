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
): Promise<{ contacts: IContactDetails[]; categories: IContactCategories }> => {
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

		return { contacts: [...new Set(contacts)], categories };
	} catch (error) {
		toastError(error);
	}
};
