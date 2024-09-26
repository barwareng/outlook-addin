import type { IContactDetails } from './interfaces/contact.interface';
import { toastSuccess } from './toast';

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
	toastSuccess('Parsing thread: ' + item?.itemType);
	if (!item) {
		return null;
	}

	let contacts: IContactDetails[] = [];
	item.to.forEach((recipient) => {
		contacts = contacts.concat({ name: recipient.displayName, email: recipient.emailAddress });
		// toastSuccess(`Recipient: ${recipient.displayName}`);
	});
	if (item.from)
		contacts = contacts.concat({ name: item.from.displayName, email: item.from.emailAddress });
	item.cc.forEach((recipient) => {
		contacts = contacts.concat({ name: recipient.displayName, email: recipient.emailAddress });
	});

	return contacts;
};
