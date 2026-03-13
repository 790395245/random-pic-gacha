import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		extend: {
			colors: {
				n: '#9e9e9e',
				r: '#2196f3',
				sr: '#9c27b0',
				ssr: '#ffc107',
				ur: '#f44336',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;