import colors from "tailwindcss/colors.js";
import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	colors: {},
	theme: {
		extend: {
			borderRadius: {
				"card-v": "4.66% / 3.33%",
				"card-h": "3.33% / 4.66%",
				"card-fallback": "6px",
				"4xl": "2rem",
			},
			fontSize: {
				none: ["0px", "0"],
				"2xs": "0.6rem",
			},
		},
	},
	safelist: ["text-attribute-smile", "text-attribute-pure", "text-attribute-cool", "text-attribute-all"],
	plugins: [
		createThemes(
			({ light, dark }) => ({
				light: light({}),
				dark: dark({
					background: {
						DEFAULT: colors.slate[900],
						content: colors.slate[800],
						panel: colors.slate[700],
						grid: colors.slate[600],
						highlight: colors.slate[500],
					},
					text: {
						DEFAULT: colors.white,
						subtle: colors.slate[400],
						header: colors.pink[400],
						cardid: colors.slate[100],
						rarity: colors.pink[300],
					},
					link: {
						DEFAULT: colors.pink[400],
						hover: colors.pink[200],
					},
					button: {
						background: colors.slate[700],
						text: colors.slate[100],
						hover: {
							background: colors.slate[500],
							text: colors.white,
						},
						pressed: colors.slate[300],
						disabled: {
							background: colors.slate[950],
							text: colors.slate[500],
						},
						accent: {
							background: colors.pink[600],
							text: colors.pink[100],
							hover: {
								background: colors.pink[400],
								text: colors.white,
							},
							pressed: colors.pink[200],
							disabled: {
								background: colors.pink[950],
								text: colors.pink[500],
							},
						},
						onpanel: {
							background: colors.slate[500],
							text: colors.white,
							hover: {
								background: colors.slate[400],
							},
						},
					},
					attribute: {
						all: "#ffdd7e",
						smile: "#fd90b9",
						pure: "#9adab2",
						cool: "#87d6f3",
					},
					highlight: {
						red: "#ffcccc",
						blue: "#ccddff",
					},
					input: {
						background: colors.slate[900],
						border: colors.slate[500],
						placeholder: colors.slate[400],
						disabled: {
							background: colors.slate[700],
							text: colors.slate[400],
						},
					},
					error: {
						text: colors.red[400],
						border: colors.red[500],
						background: colors.red[700],
					},
					table: {
						border: colors.slate[300],
					},
					faq: {
						question: colors.pink[400],
						answer: colors.slate[400],
					},
				}),
				print: light({
					link: { DEFAULT: "#ee0000" },
					attribute: {
						all: "#ffc533",
						smile: "#fc3b81",
						pure: "#3ebb65",
						cool: "#3fb6e5",
					},
					highlight: {
						red: "#ee0000",
						blue: "#0000ee",
					},
				}),
			}),
			{
				defaultTheme: "dark",
			}
		),
	],
};
