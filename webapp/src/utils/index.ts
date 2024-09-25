import { tick } from 'svelte';

export const closeAndRefocusTrigger = (triggerId: string): boolean => {
	tick().then(() => document.getElementById(triggerId)?.focus());
	return false;
};

export const setTeamId = (teamId: string) => {
	if (!teamId) return;
	localStorage.setItem('teamId', teamId);
};
export const getTeamId = () => {
	return localStorage.getItem('teamId');
};
