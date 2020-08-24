const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const _plugins = preparePlugins(env);
  return {
    mode: env,
    // Change to your "entry-point".
    entry: path.resolve(__dirname, "src/index"),
    output: {
      path: path.resolve(__dirname, "docs"),
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[chunkhash].chunk.js"
    },
    optimization: {
      minimize: env == "production",
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              comparisons: false
            },
            parse: {},
            mangle: true,
            output: {
              comments: false,
              /* eslint-disable camelcase */
              ascii_only: true
              /* eslint-enable camelcase */
            }
          },
          parallel: true,
          cache: true
        })
      ],
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0
      }
    },
    resolve: {
      extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
    },
    devtool: env == "production" ? false : "source-map",
    module: {
      rules: [
        {
          // Include jsx, and js files.
          test: /\.((j|t)sx?)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.scss$/,
          loader: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer"), require("cssnano")],
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
          include: /src/,
        },
        {
          test: /\.(png|jpg|gif|svg|icon)$/,
          loader: "file-loader",
          query: {
            outputPath: "./images",
            name: "[name].[ext]",
            publicPath: "../images"
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "file-loader",
          query: {
            outputPath: "./fonts",
            name: "[name].[ext]",
            publicPath: "../fonts"
          }
        }
      ]
    },
    devServer:
      env == "development"
        ? {
            contentBase: path.join(__dirname, "public"),
            compress: true,
            port: 8080,
            historyApiFallback: true
          }
        : {},
    plugins: _plugins
  };
};

function preparePlugins(env) {
  let _envVariables = {
    "process.env.ENV": JSON.stringify(env),
    "process.env.VERSION": JSON.stringify(require("./package.json").version)
  };
  const base = [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].[contenthash].css"
    })
  ];

  if (env == "production") {
    base.push(new CleanWebpackPlugin());
    _envVariables = { ..._envVariables, API_URL: "" };
  } else {
    _envVariables = {
      ..._envVariables,
      "process.env.API_URL": JSON.stringify("http://localhost:3000")
    };
  }

  base.push(new webpack.DefinePlugin(_envVariables));

  return base;
}
