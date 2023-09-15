const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');




module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // TODO: Add and configure workbox plugins for a service worker and manifest file.
    plugins: [

      // HtmlWebpackPlugin is used to generate an HTML file that includes the
      // bundled JavaScript files.
      new HtmlWebpackPlugin({
        template: './index.html', // Path to your HTML template
        title: "JATE"
      }),
      
      // WebpackPwaManifest is used to generate a web app manifest file.
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'a text editor able to be used offline with IndexedDB',
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Output directory for icons
          },
        ],
      }),

      // InjectManifest is used to configure and generate a service worker file.
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker source file
        swDest: 'src-sw.js', // Output service worker file name
      }),
    ],


// TODO: Add CSS loaders and babel to webpack
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        }
      ],
    },
  };
};
