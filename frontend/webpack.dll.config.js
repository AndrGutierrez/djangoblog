var webpack = require("webpack");
const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    vendor: [
      "react",
      "axios",
      "react-router",
      "react-router-dom",
      "@mui/material",
      "@mui/icons-material",
      "axios-progress-bar",
      "redux",
      "react-redux"
    ],
  },
  output: {
    path: path.resolve(__dirname, "build_client", "js"),
    filename: "[name].js",
    sourceMapFilename: "[name].map",
    pathinfo: true,
    library: "[name]_dll",
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "../static", "[name]-manifest.json"),
      name: "[name]_dll",
      context: path.resolve(__dirname, "src", "app"),
    }),
  ],
};
