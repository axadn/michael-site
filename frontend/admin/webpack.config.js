const path = require('path');
module.exports = {
  context: __dirname,
  entry: './admin.js',
  output: {
    path: path.resolve('../../', 'app', 'assets', 'javascripts'),
    filename: 'admin.js'
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
