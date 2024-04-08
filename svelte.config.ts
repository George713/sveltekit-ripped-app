import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';
import type { Config } from '@sveltejs/kit';


export default {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		outDir: "public",
	}
} satisfies Config;