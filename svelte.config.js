import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		outDir: "public",
		alias: {
			"$atoms": "./src/lib/components/atoms",
			"$molecules": "./src/lib/components/molecules",
			"$organisms": "./src/lib/components/organisms",
			"$overlays": "./src/lib/components/overlays",
			"$icons": "./src/lib/components/icons",
		}
	}
};

export default config