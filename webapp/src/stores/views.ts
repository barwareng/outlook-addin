import { writable } from 'svelte/store';
import { Views } from '$utils/interfaces/views';
import type { IContactCategories, IContactDetails } from '$utils/interfaces/contact.interface';
export const view = writable<Views>(Views.HOME);
export const contactCategory = writable<string>();
export const contactListKey = writable<string>();
export const parsed = writable<{ contacts: IContactDetails[]; categories: IContactCategories }>();
