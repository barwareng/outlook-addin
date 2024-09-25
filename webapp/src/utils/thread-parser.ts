// export const parseThread = (
// 	item:
// 		| (Office.Item &
// 				Office.ItemCompose &
// 				Office.ItemRead &
// 				Office.Message &
// 				Office.MessageCompose &
// 				Office.MessageRead &
// 				Office.Appointment &
// 				Office.AppointmentCompose &
// 				Office.AppointmentRead)
// 		| undefined
// ) => {
// 	const thread = {
// 		id: item.itemId,
// 		subject: item.subject,
// 		preview: item.bodyPreview,
// 		created: item.dateTimeCreated,
// 		updated: item.dateTimeModified,
// 		attachments: item.attachments.map((attachment) => ({
// 			id: attachment.id,
// 			name: attachment.name,
// 			size: attachment.size,
// 			type: attachment.type
// 		})),
// 		contacts: item.contacts.map((contact) => ({
// 			name: contact.displayName,
// 			email: contact.emailAddress
// 		})),
// 		categories: item.categories
// 	};

// 	return thread;
// };
