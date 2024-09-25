import { BaseService } from '$lib/api/services/utils/BaseService';

export class VerificationService extends BaseService {
	getAll() {
		return this.client.send('/api/channels', {
			method: 'GET'
		});
	}
}
