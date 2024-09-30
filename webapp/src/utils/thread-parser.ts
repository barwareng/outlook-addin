import type { IContactDetails } from './interfaces/contact.interface';
import type { IContact } from './interfaces/message.interface';
import { graphClient } from './ms-graph';
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
		toastSuccess(`Parsed ${JSON.stringify(contacts)} contacts`);
		return contacts;
	} catch (error) {
		console.error(error);
		toastError(error);
	}
};
