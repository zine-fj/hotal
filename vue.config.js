const path = require('path')

module.exports = {
	lintOnSave: true,
  outputDir: 'dist',
  publicPath: './',
	devServer: {
		proxy: {
			"/api": {
				target: process.env.VUE_APP_URL,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
	chainWebpack: (config) => {
		// 配置别名
		config.resolve.alias.set("@", path.join(__dirname, "./src/"));
	},
};
