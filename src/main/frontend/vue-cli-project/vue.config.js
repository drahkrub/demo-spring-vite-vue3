const webpack = require("webpack");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // CHANGED/ADDED - START
  //outputDir: "../../resources/static/vue-cli-project",
  outputDir: "../../../../target/classes/static/vue-cli-project",
  publicPath: "/vue-cli-project/",
  devServer: {
    open: "/w/",
    proxy: {
      ".*": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: false,
        bypass: function (req, res, proxyOptions) {
          if (req.url.startsWith("/w/")) {
            return req.url;
          }
        },
      },
    },
  },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.DefinePlugin({
  //       "process.env": {
  //         VUE_ROUTER_BASE: '"/w/"',
  //       },
  //     }),
  //   ],
  // },
  // CHANGED/ADDED - END
});
