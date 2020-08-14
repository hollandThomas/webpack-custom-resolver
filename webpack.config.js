const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const StyleResolverPlugin = require('./StyleResolverPlugin.js');

const { CUSTOMER } = process.env;

module.exports = {
  mode: 'development',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  resolve: {
    plugins: [
      new StyleResolverPlugin(CUSTOMER, path.resolve(__dirname, './commons')),
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
