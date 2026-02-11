import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, { error: 'Missing username or password' });
		}

		const user = await prisma.user.findUnique({
			where: { username }
		});

		if (!user || user.password !== password) {
			return fail(400, { error: 'Invalid credentials' });
		}

		cookies.set('userId', user.id, {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/');
	},

	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, { error: 'Missing username or password' });
		}

		const existingUser = await prisma.user.findUnique({
			where: { username }
		});

		if (existingUser) {
			return fail(400, { error: 'User already exists' });
		}

		// helper to get a random integer between min and max (inclusive)
		const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

		const newUser = await prisma.user.create({
			data: {
				username,
				password,
				character: {
					create: {
						gamesPlayed: randInt(5, 100),
						gamesWon: randInt(5, 100)
					}
				}
			}
		});

		cookies.set('userId', newUser.id, {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/');
	}
};
