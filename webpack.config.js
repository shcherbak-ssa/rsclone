const {join: joinPaths, resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const currentMode = (isDev) => isDev ? 'development' : 'production';
const currentDevtool = (isDev) => isDev ? 'eval-source-map' : false;
const outputDirname = (isDev) => isDev ? 'dev' : 'dist';

const SRC_DIRNAME = joinPaths(__dirname, 'src');

const webpackConfig = (env = {}) => {
  const isDev = env.isDev || false;

  return {
    mode: currentMode(isDev),
    devtool: currentDevtool(isDev),
    entry: joinPaths(SRC_DIRNAME, 'index.tsx'),
    output: {
      path: resolve(__dirname, outputDirname(isDev)),
      chunkFilename: joinPaths('js', '[name].chunk.js'),
      filename: joinPaths('js', 'main.js'),
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attributes: false,
                minimize: !isDev
              }
            },
            {
              loader: 'file-loader',
              options: {
                name: '[name].html',
              }
            }
          ]
        },
        {
          test: /\.ts|\.tsx$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env', '@babel/react'],
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
                sourceMap: isDev,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-short')({ prefix: 'x', skip: 'x' }),
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev,
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|svg|ico)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets',
          }
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.tsx', '.ts'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/main.css'
      })
    ],
  }
};

module.exports = webpackConfig;

