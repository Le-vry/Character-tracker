import { prisma } from '$lib';
import crypto from 'node:crypto';

function generateSessionToken(): string {
	return crypto.randomBytes(32).toString('base64url');
}

export async function createSession(userId: string, userAgent?: string, ipAddress?: string) {
	const token = generateSessionToken();
	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + 14);

	const session = await prisma.session.create({
		data: {
			token,
			userId,
			userAgent,
			ipAddress,
			expiresAt
		}
	});

	return session;
}

export async function validateSession(token?: string | null) {
	if (!token) {
		return null;
	}

	const session = await prisma.session.findUnique({
		where: { token },
		include: { user: true }
	});

	if (!session) {
		return null;
	}

	if (session.expiresAt < new Date()) {
		await prisma.session.delete({ where: { id: session.id } });
		return null;
	}

	const updatedSession = await prisma.session.update({
		where: { id: session.id },
		data: { lastUsed: new Date() },
		include: { user: true }
	});

	return updatedSession;
}
