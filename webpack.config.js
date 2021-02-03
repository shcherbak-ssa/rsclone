const {join: joinPaths, resolve} = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postcssShort = require('postcss-short');
const cssnano = require('cssnano');

const currentMode = (isDev) => isDev ? 'development' : 'production';
const currentDevtool = (isDev) => isDev ? 'eval-source-map' : false;
const outputPath = (isDev) => isDev ? ['public'] : ['dist', 'public'];

const SRC_DIRNAME = joinPaths(__dirname, 'src');

const webpackConfig = (env = {}) => {
  const isDev = env.isDev || false;
  const postcssPlugins = [
    postcssShort({ prefix: 'x', skip: 'x' }),
  ];

  if (!isDev) {
    postcssPlugins.push(cssnano({
      preset: ['default', {
        discardComments: {
            removeAll: true,
        },
    }]
    }));
  }

  return {
    mode: currentMode(isDev),
    devtool: currentDevtool(isDev),
    entry: joinPaths(SRC_DIRNAME, 'index.tsx'),
    output: {
      path: resolve(__dirname, ...outputPath(isDev)),
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
                minimize: !isDev,
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
                plugins: [
                  '@babel/plugin-transform-regenerator',
                ],
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  module: 'esnext',
                  sourceMap: isDev,
                },
              },
            }
          ]
        },
        {
          test: /\.css$/,
          include: /themes/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].css',
                outputPath: 'css',
              }
            },
            'extract-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
                sourceMap: false,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: postcssPlugins,
                }
              }
            },
          ]
        },
        {
          test: /\.(sc|c)ss$/,
          exclude: /themes/,
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
                  plugins: postcssPlugins,
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
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: joinPaths('css', '[name].css'),
        chunkFilename: joinPaths('css', '[id].css'),
      }),
    ],
  }
};

module.exports = webpackConfig;
