import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import check from './chore.js';

export default defineConfig({
	plugins: [sveltekit(),{
		name: "chores",
		handleHotUpdate({ file, server }) {
			check();
		},
	}],
});
