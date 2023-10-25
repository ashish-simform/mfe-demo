const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `app1@${domain}/app1/remoteEntry.js`,
        auth: `app2@${domain}/app2/remoteEntry.js`,
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          // react
          singleton: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-dom": {
          // react-dom
          singleton: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
