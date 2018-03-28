const path = require('path');
module.exports = {
  context: __dirname,
  entry: {
    client: "./client/client.js",
    admin: "./admin/admin.js"
  },
  output: {
    path: path.resolve('../', 'app', 'assets', 'javascripts'),
    filename: '[name].js'
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
    alias: {
      SharedComponents: path.resolve("./", "shared/components"),
      ClientComponents: path.resolve("./", "client/components")
    },
    extensions: [".jsx", ".js"]
  },
  devtool: 'source-maps',
};
