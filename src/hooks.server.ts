import { prisma } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const userId = event.cookies.get('userId');

	if (!userId) {
		event.locals.user = null;
		return resolve(event);
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { id: true, username: true }
	});

	if (user) {
		event.locals.user = user;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
