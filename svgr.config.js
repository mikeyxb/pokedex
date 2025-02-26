// svgr.config.js
export default {
	icon: false,
	typescript: true,
	prettier: true,
	jsxRuntime: "automatic",
	plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
	svgoConfig: {
		plugins: [
			{
				name: "preset-default",
				params: {
					overrides: {
						removeViewBox: false,
					},
				},
			},
			"prefixIds",
		],
	},
};
