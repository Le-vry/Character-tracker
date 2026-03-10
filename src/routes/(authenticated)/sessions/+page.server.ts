import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { prisma } from '$lib';
import { validateSession } from '$lib/server/session';

export const load = async ({ cookies }) => {
	const sessionToken = cookies.get('sessionToken');
	const currentSession = await validateSession(sessionToken);

	if (!currentSession) {
		throw redirect(307, '/login');
	}

	const sessions = await prisma.session.findMany({
		where: { userId: currentSession.user.id },
		orderBy: { lastUsed: 'desc' }
	});

	return {
		sessions,
		currentSessionId: currentSession.id
	};
};

export const actions: Actions = {
	revokeSession: async ({ request, cookies }) => {
		const sessionToken = cookies.get('sessionToken');
		const currentSession = await validateSession(sessionToken);
		if (!currentSession) {
			throw redirect(307, '/login');
		}

		const data = await request.formData();
		const sessionId = data.get('sessionId')?.toString();

		if (sessionId) {
			await prisma.session.deleteMany({
				where: {
					id: sessionId,
					userId: currentSession.user.id
				}
			});
		}
	},

	revokeAllSessions: async ({ cookies }) => {
		const sessionToken = cookies.get('sessionToken');
		const currentSession = await validateSession(sessionToken);

		if (currentSession) {
			await prisma.session.deleteMany({
				where: {
					userId: currentSession.user.id,
					id: { not: currentSession.id }
				}
			});
		}
	}
};
