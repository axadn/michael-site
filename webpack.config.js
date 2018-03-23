const path = require('path');
module.exports = {
  context: __dirname,
  entry: './frontend/client.js',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
  },
  devtool: 'source-maps',
};
