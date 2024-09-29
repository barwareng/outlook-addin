import type { IContactDetails } from './interfaces/contact.interface';
import { getGraphData } from './ms-graph';
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
	getGraphData(
		`https://graph.microsoft.com/v1.0/me/messages?conversationId=${item?.conversationId}`
	);

	return contacts;
};
