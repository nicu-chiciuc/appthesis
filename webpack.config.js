module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    // host: '0.0.0.0',
    // public: '192.168.0.101:8080'
  },
  devtool: "source-map"
};
