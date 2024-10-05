import { BaseService } from '$lib/api/services/utils/BaseService';

import type { ISaveContactBody } from '$utils/interfaces/contact.interface';

export class ContactService extends BaseService {
	create(body: Partial<ISaveContactBody>) {
		return this.client.send('/api/contacts', {
			method: 'POST',
			body
		});
	}
}
