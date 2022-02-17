const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackDevServer = require("webpack-dev-server");
const Dotenv = require("dotenv-webpack");

module.exports = {
  devtool: "source-map",
  entry: {
    home: path.resolve(__dirname, "./src/index"),
  },
  output: {
    path: path.resolve(__dirname, "../static"),
    filename: "static/js/bundle.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[hash].[ext]",
            },
            // use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin({}),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, "dist", "vendor-manifest.json"),
    }),
  ],
};
