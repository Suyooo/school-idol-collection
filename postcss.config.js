import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import tailwind from "tailwindcss";
import tailwindNested from "tailwindcss/nesting/index.js";
import tailwindConfig from "./tailwind.config.js";

export default {
	plugins: [tailwindNested(postcssNesting), tailwind(tailwindConfig), autoprefixer],
};
