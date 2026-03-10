import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib';

export const actions = {
	default: async ({ cookies }) => {
		const sessionToken = cookies.get('sessionToken');

		if (sessionToken) {
			await prisma.session.deleteMany({ where: { token: sessionToken } });
		}

		cookies.delete('sessionToken', { path: '/' });
		throw redirect(303, '/');
	}
};
