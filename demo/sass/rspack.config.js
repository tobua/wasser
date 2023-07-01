export default {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
          },
        ],
        type: 'css',
      },
    ],
  },
}
