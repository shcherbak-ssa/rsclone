const {join: joinPaths, resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const currentMode = (isDev) => isDev ? 'development' : 'production';
const currentDevtool = (isDev) => isDev ? 'eval-source-map' : false;
const outputDirname = (isDev) => isDev ? 'dev' : 'dist';

const SRC_DIRNAME = resolve(__dirname, '..', 'src');
const ENTRY_FILENAME = 'index.tsx';

function getEntryFilename(dirname) {
  return joinPaths(SRC_DIRNAME, dirname, ENTRY_FILENAME);
}

function getOutputDirname(isDev, dirname) {
  return resolve(__dirname, '..', outputDirname(isDev), dirname);
}

const commonConfig = ({isDev, entryDirname, outputDirname, outputFilename}) => {
  return {
    mode: currentMode(isDev),
    devtool: currentDevtool(isDev),
    entry: getEntryFilename(entryDirname),
    output: {
      path: getOutputDirname(isDev, outputDirname),
      chunkFilename: joinPaths('js', '[name].chunk.js'),
      filename: joinPaths('js', outputFilename),
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
                name: 'views/[name].html',
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
                configFile: resolve(__dirname, '../tsconfig.json'),
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
                plugins: [
                  require('postcss-short')({ prefix: 'x', skip: 'x' }),
                ]
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
          test: /\.ttf$/,
          loader: 'file-loader',
          options: {
            name: '[name].ttf',
            outputPath: 'assets/fonts',
          }
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          }
        },
        {
          test: /\.ico$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets',
          }
        }
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

module.exports = commonConfig;
