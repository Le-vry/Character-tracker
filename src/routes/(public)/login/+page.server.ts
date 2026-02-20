import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib';
import type { Actions } from '@sveltejs/kit';

import * as crypto from "node:crypto";

const failedAttempts = new Map<string, { count: number, lastAttempt: Date }>();

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

function validatePasswordStrength(password: string): string[] {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Vanliga lösenord att undvika
  const commonPasswords = ['password', '123456', 'qwerty', 'abc123', 'password123'];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common');
  }
  
  return errors;
}

export const actions: Actions = {
	login: async ({ request, cookies, getClientAddress }) => {
		const clientIP = getClientAddress();

		const attempts = failedAttempts.get(clientIP);
		if (attempts && attempts.count >= 5) {
		const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
		if (timeSinceLastAttempt < 15 * 60 * 1000) { // 15 minuter
			return fail(429, { error: 'Too many failed attempts. Try again in 15 minutes' });
		} else {
			// Reset efter timeout
			failedAttempts.delete(clientIP);
		}
		}
    
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, { error: 'Missing username or password' });
		}

		const user = await prisma.user.findUnique({
			where: { username }
		});

		const dummySalt = 'dummysalt123456789abcdef123456789abcdef';
		const dummyHash = 'dummyhash123456789abcdef123456789abcdef123456789abcdef123456789abcdef';
		
		const isValidPassword = user 
		? validatePassword(password, user.salt, user.hash)
		: validatePassword(password, dummySalt, dummyHash);


		if (!user || !isValidPassword) {
		const current = failedAttempts.get(clientIP) || { count: 0, lastAttempt: new Date() };
		failedAttempts.set(clientIP, {
			count: current.count + 1,
			lastAttempt: new Date()
		});
      
      	return fail(400, { error: 'Invalid username or password' });
    	} else {
			// Nollställ vid lyckad inloggning
			failedAttempts.delete(clientIP);

				cookies.set('userId', user.id, {
					path: '/',
					httpOnly: true,
					secure: false,
					maxAge: 60 * 60 * 24 * 7 // 1 week
				});

		throw redirect(303, '/');
		}
	},

	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (!username || !password) {
      		return fail(400, { error: 'All fields must be filled' });
    	}
    
		// Validera lösenordsstyrka
		const passwordErrors = validatePasswordStrength(password);
		if (passwordErrors.length > 0) {
		return fail(400, { error: passwordErrors.join('. ') });
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
