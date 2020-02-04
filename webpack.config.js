var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js'
  },
  devServer: {
    contentBase: './',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({template: './template/index.html'})],
};