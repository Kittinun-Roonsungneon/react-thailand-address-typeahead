// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: "./lib/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  devtool: 'source-map',
  plugins: [ ],
  externals: {
    react: 'react'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
        options: {
          compilerOptions: {
            declaration: true,
            sourceMap: true,
            outDir: path.resolve(__dirname, "dist"),
            exclude: ["dist"]
          }
        }
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};

