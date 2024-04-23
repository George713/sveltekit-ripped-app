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
			"$organismns": "./src/lib/components/organismns",
		}
	}
};

export default config