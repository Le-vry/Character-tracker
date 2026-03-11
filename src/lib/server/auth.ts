import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib';
import crypto from 'node:crypto';
import { validateSession } from './session';
import { createSession } from './session';

const failedAttempts = new Map<string, { count: number; lastAttempt: Date }>();

function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

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

  const commonPasswords = ['password', '123456', 'qwerty', 'abc123', 'password123'];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common');
  }

  return errors;
}

export async function loginAction({ request, cookies, getClientAddress }: any) {
  const clientIP = getClientAddress();

  const attempts = failedAttempts.get(clientIP);
  if (attempts && attempts.count >= 5) {
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
    if (timeSinceLastAttempt < 15 * 60 * 1000) {
      return fail(429, { error: 'Too many failed attempts. Try again in 15 minutes' });
    }
    failedAttempts.delete(clientIP);
  }

  const data = await request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  const rememberMe = data.get('rememberMe') === 'on';

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return fail(400, { error: 'Missing username or password' });
  }

  const user = await prisma.user.findUnique({ where: { username } });

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
  }

  failedAttempts.delete(clientIP);

  const sessionDays = rememberMe ? 90 : 14;
  const session = await createSession(
    user.id,
    request.headers.get('user-agent') ?? undefined,
    clientIP,
    sessionDays
  );

  cookies.set('sessionToken', session.token, {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * sessionDays
  });

  throw redirect(303, '/');
}

export async function registerAction({ request, cookies, getClientAddress }: any) {
  const data = await request.formData();
  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();

  if (!username || !password) {
    return fail(400, { error: 'All fields must be filled' });
  }

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
  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const newUser = await prisma.user.create({
    data: {
      username,
      salt,
      hash,
      character: {
        create: {
          gamesPlayed: randInt(5, 100),
          gamesWon: randInt(5, 100)
        }
      }
    }
  });

  const session = await createSession(
    newUser.id,
    request.headers.get('user-agent') ?? undefined,
    getClientAddress()
  );

  cookies.set('sessionToken', session.token, {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 14
  });

  throw redirect(303, '/');
}

// Din uppgift: Implementera denna funktion
export async function requireAuth(cookies: any) {
  const sessionToken = cookies.get('sessionToken');
  
  if (!sessionToken) {
    throw redirect(303, '/unauthorized');
  }
  
  const session = await validateSession(sessionToken);
  
  if (!session) {
    cookies.delete('sessionToken', { path: '/' });
    throw redirect(303, '/unauthorized');
  }
  
  return session.user;
}

// Bonus: Skapa en "optional auth" funktion
export async function getUser(cookies: any) {
  const sessionToken = cookies.get('sessionToken');
  
  if (!sessionToken) {
    return null;
  }
  
  const session = await validateSession(sessionToken);

  if (!session) {
    cookies.delete('sessionToken', { path: '/' });
    return null;
  }
  
  return session.user;
}