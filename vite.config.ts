import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],

	ssr: {
		external: ['@prisma/client', 'prisma']
	},
	build: {
		rollupOptions: {
			external: ['@prisma/client', 'prisma']
		}
	}
});
