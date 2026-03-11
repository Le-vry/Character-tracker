import type { Actions } from '@sveltejs/kit';
import { registerAction } from '$lib/server/auth';

export const actions: Actions = {
	register: registerAction
};
