import type { IContactDetails } from './interfaces/contact.interface';
import { toastSuccess } from './toast';

export const parseThread = (
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
	toastSuccess(item?.conversationId);
	let contacts: IContactDetails[] = [];
	contacts = contacts.concat({ name: item?.from?.displayName, email: item?.from?.emailAddress });
	toastSuccess(JSON.stringify(contacts, null, 2));
};
