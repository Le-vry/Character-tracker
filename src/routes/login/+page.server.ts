import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib';
import type { Actions } from './$types';

import * as crypto from "node:crypto";

// Function to generate a new salt and hash a password
function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

// Function to validate a password against a stored salt and hash
function validatePassword(inputPassword: string, storedSalt: string, storedHash: string): boolean {
  const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, 10000, 64, 'sha512').toString('hex');
  return storedHash === hash;
}

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

		if (!user || !user.salt || !user.hash) {
			return fail(400, { error: 'Invalid credentials' });
		}

		const isValidPassword = validatePassword(password, user.salt, user.hash);

		if (!isValidPassword) {
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
			
		if (username.length < 3) {
			return fail(400, { error: 'Username must contain atleast 3 characters' });
		}
			
		if (password.length < 6) {
			return fail(400, { error: 'Password must contain atleast 6 characters' });
		}

		const existingUser = await prisma.user.findUnique({
			where: { username }
		});

		if (existingUser) {
			return fail(400, { error: 'User already exists' });
		}

		const { salt, hash } = hashPassword(password);

		// helper to get a random integer between min and max (inclusive)
		const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

		const newUser = await prisma.user.create({
			data: {
				username,
				salt: salt,
        		hash: hash,
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
