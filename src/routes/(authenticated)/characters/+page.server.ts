import { prisma } from '$lib';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
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
		user: locals.user,
		characters: characters
	};
}) satisfies PageServerLoad;