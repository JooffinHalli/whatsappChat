const { ProvidePlugin, DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx"],
    alias: {
      api: path.resolve(__dirname, "src/api"),
      app: path.resolve(__dirname, "src/app"),
      utils: path.resolve(__dirname, "src/utils")
    }
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public/dist")
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new ProvidePlugin({
      "React": "react"
    }),
    new DefinePlugin({
      _API_HOST_: JSON.stringify(process.env.API_HOST),
    })
  ]
};