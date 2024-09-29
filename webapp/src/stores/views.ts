import { writable } from 'svelte/store';
import { Views } from '$utils/interfaces/views';
export const view = writable<Views>(Views.HOME);
