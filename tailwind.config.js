import colors from "tailwindcss/colors.js";
import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			transparent: "transparent",
			white: "white",
			black: "black",
		},
		extend: {
			borderRadius: {
				"card-v": "4.66% / 3.33%",
				"card-h": "3.33% / 4.66%",
				"card-fallback": "6px",
			},
			fontSize: {
				none: ["0px", "0"],
				"2xs": "0.6rem",
			},
			width: {
				"card-long": "181px",
				"card-short": "130px",
			},
			height: {
				"card-long": "181px",
				"card-short": "130px",
			},
		},
	},
	safelist: ["text-attribute-smile", "text-attribute-pure", "text-attribute-cool", "text-attribute-all"],
	plugins: [
		createThemes(
			({ light, dark }) => ({
				light: light({
					background: {
						DEFAULT: colors.cyan[50],
						accent: colors.cyan[300],
						panel: colors.slate[50],
						grid: colors.cyan[100],
						highlight: colors.cyan[200],
					},
					text: {
						DEFAULT: colors.cyan[950],
						contrast: colors.white,
						subtle: colors.slate[400],
						header: {
							DEFAULT: colors.cyan[900],
							breadcrumb: colors.cyan[600],
							intext: colors.pink[800],
						},
						cardid: {
							DEFAULT: colors.slate[600],
							hover: colors.slate[500],
						},
						rarity: {
							DEFAULT: colors.pink[900],
							hover: colors.pink[700],
						},
					},
					link: {
						DEFAULT: colors.pink[700],
						hover: colors.pink[500],
					},
					button: {
						background: colors.cyan[200],
						text: colors.cyan[950],
						hover: {
							background: colors.cyan[100],
							text: colors.black,
						},
						pressed: colors.white,
						disabled: {
							background: colors.slate[200],
							text: colors.slate[500],
						},
						accent: {
							background: colors.pink[300],
							text: colors.pink[950],
							hover: {
								background: colors.pink[200],
								text: colors.black,
							},
							pressed: colors.pink[50],
							disabled: {
								background: colors.stone[200],
								text: colors.stone[500],
							},
						},
						header: {
							background: colors.cyan[100],
							text: colors.black,
							hover: {
								background: colors.cyan[50],
							},
						},
					},
					attribute: {
						all: "#996633",
						smile: "#df1961",
						pure: "#06862e",
						cool: "#067baa",
					},
					highlight: {
						red: "#ee0000",
						blue: "#0000ee",
					},
					input: {
						background: colors.sky[100],
						border: colors.cyan[300],
						placeholder: colors.cyan[500],
						disabled: {
							text: colors.slate[400],
						},
					},
					error: {
						text: colors.red[600],
						border: colors.red[500],
						background: colors.red[300],
					},
					table: {
						border: colors.cyan[500],
					},
					faq: {
						question: colors.pink[500],
						answer: colors.cyan[500],
					},
				}),
				dark: dark({
					background: {
						DEFAULT: colors.slate[950],
						accent: colors.cyan[700],
						panel: colors.cyan[950],
						grid: colors.cyan[900],
						highlight: colors.cyan[500],
					},
					text: {
						DEFAULT: colors.white,
						contrast: colors.black,
						subtle: colors.slate[400],
						header: {
							DEFAULT: colors.cyan[50],
							breadcrumb: colors.sky[200],
							intext: colors.pink[400],
						},
						cardid: {
							DEFAULT: colors.slate[200],
							hover: colors.slate[50],
						},
						rarity: {
							DEFAULT: colors.pink[200],
							hover: colors.pink[50],
						},
					},
					link: {
						DEFAULT: colors.pink[300],
						hover: colors.pink[100],
					},
					button: {
						background: colors.cyan[700],
						text: colors.cyan[50],
						hover: {
							background: colors.cyan[700],
							text: colors.white,
						},
						pressed: colors.cyan[500],
						disabled: {
							background: colors.slate[600],
							text: colors.slate[400],
						},
						accent: {
							background: colors.pink[600],
							text: colors.pink[50],
							hover: {
								background: colors.pink[500],
								text: colors.white,
							},
							pressed: colors.pink[300],
							disabled: {
								background: colors.stone[600],
								text: colors.stone[400],
							},
						},
						header: {
							background: colors.cyan[500],
							text: colors.white,
							hover: {
								background: colors.cyan[400],
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
						border: colors.cyan[700],
						placeholder: colors.cyan[500],
						disabled: {
							text: colors.slate[400],
						},
					},
					error: {
						text: colors.red[400],
						border: colors.red[500],
						background: colors.red[700],
					},
					table: {
						border: colors.cyan[500],
					},
					faq: {
						question: colors.pink[400],
						answer: colors.cyan[400],
					},
				}),
				print: light({
					link: { DEFAULT: "#ee0000" },
					attribute: {
						all: "#996633",
						smile: "#df1961",
						pure: "#06862e",
						cool: "#067baa",
					},
					highlight: {
						red: "#ee0000",
						blue: "#0000ee",
					},
				}),
			}),
			{
				defaultTheme: "light",
			}
		),
	],
};
