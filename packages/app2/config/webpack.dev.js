const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const path = require("path");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:3002/",
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"),
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
