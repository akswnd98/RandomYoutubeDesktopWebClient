const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    public: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_bundle.js',
    publicPath: '/desktop',
  },
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, 'src'),
      '@/assets': path.resolve(__dirname, 'assets'),
      '@/web-client-common': path.resolve(__dirname, 'web-client-common'),
    },
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              "babel-plugin-transform-typescript-metadata",
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      }, {
        test: /\.(jpe?g|png)$/i,
        exclude: /node_modules/,
        include: /assets\/images/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][name][ext]',
        },
      }, {
        test: /\.(svg)$/i,
        exclude: /node_modules/,
        include: /assets\/images/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][name][ext]',
        },
      }, {
        test: /\.(ttf)/i,
        exclude: /node_modules/,
        include: /assets\/fonts/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][name][ext]',
        },
      }, {
        test: /\.(css)$/,
        use: ['css-loader'],
      }, {
        test: /\.(scss)$/,
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
        exclude: /node_module/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['public'],
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:11000',
        changeOrigin: true,
      },
    },
    watchFiles: {
      paths: ['*.ts', '*.scss', '*.css'],
    },
  },
};
