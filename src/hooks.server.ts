import type { Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/session';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('sessionToken');

	if (!sessionToken) {
		event.locals.user = null;
		return resolve(event);
	}

	const session = await validateSession(sessionToken);

	if (session) {
		event.locals.user = { id: session.user.id, username: session.user.username };
	} else {
		if (sessionToken) {
			event.cookies.delete('sessionToken', { path: '/' });
		}

		event.locals.user = null;
	}

	return resolve(event);
};
