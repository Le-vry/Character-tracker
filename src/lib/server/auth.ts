import { redirect } from '@sveltejs/kit';
import { validateSession } from './session';

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