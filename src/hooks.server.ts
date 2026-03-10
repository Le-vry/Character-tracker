import { prisma } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('sessionToken');

	if (!sessionToken) {
		event.locals.user = null;
		return resolve(event);
	}

	const session = await prisma.session.findUnique({
		where: { token: sessionToken },
		include: {
			user: {
				select: { id: true, username: true }
			}
		}
	});

	if (session && session.expiresAt > new Date()) {
		event.locals.user = session.user;
	} else {
		if (sessionToken) {
			event.cookies.delete('sessionToken', { path: '/' });
		}

		if (session) {
			await prisma.session.delete({ where: { id: session.id } });
		}

		event.locals.user = null;
	}

	return resolve(event);
};
