module.exports = {
  mode: 'production',
  entry: {
    'sender': './src/sender',
    'receiver': './src/receiver'
  },
  devtool: 'inline-cheap-source-map',
  output: {
    libraryTarget: 'umd'
  }
}
