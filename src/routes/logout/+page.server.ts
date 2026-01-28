import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('userId', { path: '/' });
		throw redirect(303, '/login');
	}
};
