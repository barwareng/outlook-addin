import { BaseService } from '$lib/api/services/utils/BaseService';

export class VerificationService extends BaseService {
	verify(values: string[]) {
		return this.client.send('/api/verification', {
			method: 'POST',
			body: { values }
		});
	}
	verifyPublic(values: string[]) {
		return this.client.send('/public/verification', {
			method: 'POST',
			body: { values }
		});
	}
}
