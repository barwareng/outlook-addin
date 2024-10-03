export interface IContactCategories {
	flagged: string[];
	untrustedContacts: string[];
	unknown: string[];
	verified: string[];
	trustedContacts: string[];
	teamMembers: string[];
}
export interface IContactDetails {
	name: string;
	email: string;
}
