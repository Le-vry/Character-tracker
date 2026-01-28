import { prisma } from '$lib/prisma';
import { requireAuth } from '$lib/auth';
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