
/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	// 1. Apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 2. Append the path for the Skeleton NPM package and files:
	],
	theme: {
		extend: {},
	},
	plugins: [
	]
}
			
