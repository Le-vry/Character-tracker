import { prisma } from '$lib';

export async function cleanupExpiredSessions() {
	const deleted = await prisma.session.deleteMany({
		where: {
			expiresAt: { lt: new Date() }
		}
	});

	console.log(`Cleaned up ${deleted.count} expired sessions`);
}

export async function detectSuspiciousActivity(userId: string) {
	const sessions = await prisma.session.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' }
	});

	const ipAddresses = new Set(sessions.map((s: { ipAddress: any; }) => s.ipAddress));
	const recentSessions = sessions.filter(
		(s: { createdAt: number; }) => s.createdAt > Date.now() - 24 * 60 * 60 * 1000
	);

	if (ipAddresses.size > 5) {
		console.warn(`User ${userId} has sessions from ${ipAddresses.size} different IPs`);
	}

	if (recentSessions.length > 10) {
		console.warn(`User ${userId} created ${recentSessions.length} sessions in 24h`);
	}
}

// Run daily (in a real app, use a cron job)
if (typeof window === 'undefined') {
	setInterval(cleanupExpiredSessions, 24 * 60 * 60 * 1000);
}
