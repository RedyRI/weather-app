const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
// /** @type {import('webpack').Configuration} */
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const DotEnv = require('dotenv-webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js', // especificar el archivo raiz que controlara toda nuestra aplicacion
  output: {
    // especificar la salida de nuestros archivos generados
    filename: '[name].[contenthash].js', // para ver el hash de la operacion generada por webpack, o en otras palabras identifica el build o el id de la operacion que se realizo, si no se deteca ningun cambio el hash seguira siendo igual, caso contrario se tendra un hash diferente
    path: path.resolve(__dirname, 'dist'), // usar el module path que viene incluido en la instalacion de node para poder identificar la ubicacion del proyecto y la carpeta dist
    assetModuleFilename: 'static/[name][ext][query]', // para especificar la carpeta de salida de nuestos assets generados, que en este proyecto serian las imagenes
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      // los alias nos sirven para crear variables que guarden alguna ruta especifica que regularmente sea un poco larga o complicada de recordar de esta manera podemos utilizar esta variable en lugar de especificar la ruta completa
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    },
  },
  devtool: 'source-map',
  module: {
    // configurar los loaders necesarios para procesar los diferentes formatos de archivos con los que trabajaremos y sus respectivos loaders y de ser el caso las opciones
    rules: [
      {
        test: /\.m?js$/, // .mjs estension de modulos de js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader, 
          options: {
            publicPath: '../',
          }  
        },
          { loader: 'css-loader' }, 
          { loader: 'sass-loader'}
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /.pug$/i,
        use: 'pug-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
            name: '[name].[contenthash].[ext]',
            outputPath: './assets/fonts/',
            publicPath: '../assets/fonts',
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true, // injectar el codigo de index.js, seteado true by default
      template: './src/index.pug', // src del html que deseamos usar, puede ser preprocesadores como pug
      filename: 'index.html', // el nombre que tendra nuestro archivo de salida en la carpeta dist
    }),
    new MiniCssExtractPlugin({
      filename: './assets/[name].[contenthash].css',
    }), // extraer el css del codigo boundled, en nuestro caso el main.js
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src', 'assets/images'),
    //       to: 'assets/images',
    //     },
    //   ],
    // }),
    // new DotEnv(), // permite trabajar con variables de entorno
    // new CleanWebpackPlugin(), // limpia todos los archivos innecesarios de la carpeta dist
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], // cssminimizerplugin to minimize css and terser fot javascript
  },
}

// use the copy plugin to copy the files you want in th output dist directory, it is useful for images, but since we are working with webpack, we have to do the webpack way, wich is importing the images, and using the built-in loader assets/resource that let us import images into js and use them as variables
