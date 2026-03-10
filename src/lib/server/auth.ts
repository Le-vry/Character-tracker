import { prisma } from '$lib';
import { redirect } from '@sveltejs/kit';

// Din uppgift: Implementera denna funktion
export async function requireAuth(cookies: any) {
  const sessionToken = cookies.get('sessionToken');
  
  if (!sessionToken) {
    throw redirect(303, '/unauthorized');
  }
  
  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true }
  });
  
  if (!session || session.expiresAt <= new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } });
    }
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
  
  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true }
  });

  if (!session || session.expiresAt <= new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } });
    }
    cookies.delete('sessionToken', { path: '/' });
    return null;
  }
  
  return session.user;
}