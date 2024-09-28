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
	let contacts: IContactDetails[] = [];
	contacts = contacts.concat({ name: item?.from?.displayName, email: item?.from?.emailAddress });
	contacts = contacts.concat(
		item?.cc?.map((cc) => ({ name: cc.displayName, email: cc.emailAddress })) || []
	);
	contacts = contacts.concat({ name: item?.to?.displayName, email: item?.to?.emailAddress });
	// toastSuccess(JSON.stringify(contacts, null, 2));
	// toastSuccess(item?.conversationId);
};
