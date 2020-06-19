module.exports = {
	plugins: [
		require("cssnano"),
		require("postcss-cssnext"), // 已包含 autoprefixer
		require("postcss-pxtorem"),
	],
};
