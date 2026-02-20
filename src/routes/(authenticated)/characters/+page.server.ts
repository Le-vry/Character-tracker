import { prisma } from '$lib';
import { requireAuth } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	// Din uppgift: Använd requireAuth för att skydda sidan
	const user = await requireAuth(cookies);
	
	const characters = await prisma.character.findMany({
		include: {
			user: {
				select: {
					username: true
				}
			}
		}
	});

	return {
		user: user,
		characters: characters
	};
}) satisfies PageServerLoad;