const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-class-properties']
              }
          }
          },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
 
            'file-loader',
 
          ],
        },
        { 
        test: /\.m?tsx$/, 
          loader: "ts-loader" 
        },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'mapbox-gl': '../../node_modules/mapbox-gl/dist/mapbox-gl.js'
    }
  }
};