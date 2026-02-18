import { fail, redirect } from '@sveltejs/kit';
import type { Actions, ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib';

export const load: ServerLoad = async ({ locals }) => {
  // Kontrollera att användaren är inloggad
  if (!locals?.user) {
    throw redirect(303, '/login');
  }

  // Hämta användarens profil data
  const user = await prisma.user.findUnique({
    where: { id: locals.user.id },
    select: {
      id: true,
      username: true,
      email: true,
      profilePicture: true
    }
  });

  if (!user) {
    throw redirect(303, '/login');
  }

  return {
    user
  };
};

// Din uppgift: Implementera upload-logiken
export const actions: Actions = {
  upload: async ({ request, locals }) => {
    const data = await request.formData();
    const file = data.get('image');

    // Kontrollera att användaren är inloggad
    if (!locals?.user) {
      return fail(401, { error: 'Unauthorized' });
    }

    // Validering
    if (!file || typeof (file as any).arrayBuffer !== 'function') {
      return fail(400, { error: 'No file uploaded' });
    }

    const f = file as File;

    // Är det en bild?
    if (!f.type || !f.type.startsWith('image/')) {
      return fail(400, { error: 'Uploaded file is not an image' });
    }

    // Är den för stor? (sätt max 5MB här)
    const MAX_BYTES = 5 * 1024 * 1024;
    if (f.size > MAX_BYTES) {
      return fail(400, { error: 'File too large (max 5MB)' });
    }

    try {
      // Konvertering till Base64
      const ab = await f.arrayBuffer();
      const buffer = Buffer.from(ab);
      const base64 = buffer.toString('base64');

      // Prefix så det kan användas direkt i <img src="...">
      const dataUri = `data:${f.type};base64,${base64}`;

      // Spara i databasen på användaren
      await prisma.user.update({
        where: { id: locals.user.id },
        data: { profilePicture: dataUri }
      });

      // Vid lyckad uppladdning, omdirigera tillbaka till profil
    } catch (e) {
      console.error('Upload error:', e);
      return fail(500, { error: 'Server error while saving image' });
    }
    throw redirect(303, '/profile');
  }
};