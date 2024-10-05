export interface IMessage {
	'@odata.context': string;
	'@odata.etag': string;
	id: string;
	createdDateTime: Date;
	lastModifiedDateTime: Date;
	changeKey: string;
	categories: any[];
	receivedDateTime: Date;
	sentDateTime: Date;
	hasAttachments: boolean;
	internetMessageId: string;
	subject: string;
	bodyPreview: string;
	importance: string;
	parentFolderId: string;
	conversationId: string;
	isDeliveryReceiptRequested: boolean;
	isReadReceiptRequested: boolean;
	isRead: boolean;
	isDraft: boolean;
	webLink: string;
	inferenceClassification: string;
	body: IBody;
	sender: IContact;
	from: IContact;
	toRecipients: IContact[];
	ccRecipients: IContact[];
	bccRecipients: IContact[];
	replyTo: IContact[];
	flag: {
		flagStatus: string;
	};
}

export interface IBody {
	contentType: string;
	content: string;
}

export interface IContact {
	emailAddress: {
		name: string;
		address: string;
	};
}
