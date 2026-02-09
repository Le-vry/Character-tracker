import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

// Din uppgift: Implementera denna funktion
export async function requireAuth(cookies: any) {
  // 1. Få userId från cookies
  const userId = cookies.get('userId');
  
  // 2. Om ingen cookie: redirect till unauthorized
  if (!userId) {
    throw redirect(303, '/unauthorized');
  }
  
  // 3. Hitta användare i databas
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  // 4. Om användare inte finns: rensa cookie och redirect
  if (!user) {
    cookies.delete('userId', { path: '/' });
    throw redirect(303, '/unauthorized');
  }
  
  // 5. Returnera användaren
  return user;
}

// Bonus: Skapa en "optional auth" funktion
export async function getUser(cookies: any) {
  // Din uppgift: Som requireAuth men utan redirect
  // Returnera user eller null
  const userId = cookies.get('userId');
  
  if (!userId) {
    return null;
  }
  
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  return user || null;
}