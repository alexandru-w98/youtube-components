const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    return {
      entry: "./src/components/index.ts",
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader",
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64]",
                sourceMap: true,
                minimize: true,
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/prod"),
        libraryTarget: "commonjs",
      },
      externals: {
        react: "react",
      },
      plugins: [new MiniCssExtractPlugin()],
    };
  }

  if (argv.mode === "development") {
    return {
      entry: "./dev/index.tsx",
      output: {
        path: __dirname + "/dist/dev",
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
              extensions: [".ts", ".tsx", ".js", ".json"],
            },
            use: "ts-loader",
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
            ],
          },
        ],
      },
      devtool: "source-map",
      plugins: [
        new HtmlWebpackPlugin({
          template: "./dev/index.html",
        }),
        new MiniCssExtractPlugin(),
      ],
    };
  }
};
