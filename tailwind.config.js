/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{css,js,ts,jsx,tsx}",
		"./components/**/*.{css,js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			sm: "425px",
			md: "768px",
			lg: "1024px",
			xl: "1440px",
		},
		fontSize: {
			sm: "0.75rem",
			base: "1rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
		},
		colors: {
			black: "black",
			white: "white",
			"clr-primary": "#B1C9E8",
			"clr-secondary": "#8AAEDC",
			"clr-accent": "#ffd39a",
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
