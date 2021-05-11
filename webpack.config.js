// eslint-disable-next-line no-unused-vars
// для добавления HTML файлов htmlWebpackPluginCreator(template)
// где template название файла с расширением
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {};
  if (isProd) {
    config.minimizer = [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];
  return loaders;
};


const htmlWebpackPluginCreator = (template, ...args) =>
  new HtmlWebpackPlugin({
    chunks: [...args],
    template: `./pages/${template}`,
    minify: {
      collapseWhitespace: isProd,
    },
    inject: 'body',
    filename: template,
  });

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      inject: 'body',
      filename: 'index.html',
    }),
    htmlWebpackPluginCreator('main.html', 'common', 'main_page'),
    htmlWebpackPluginCreator('user_table.html', 'common', 'user_table'),
    htmlWebpackPluginCreator('registration.html', 'common', 'registration_page'),
    htmlWebpackPluginCreator('resetPassword.html', 'common', 'reset_password_page'),    
    htmlWebpackPluginCreator('movies.html', 'common', 'movies_page'),
    htmlWebpackPluginCreator('moviesSimple.html', 'common', 'movies_simple_page'),
    htmlWebpackPluginCreator('menu.html', 'common', 'menu_page'),
    htmlWebpackPluginCreator('filterMovies.html', 'common', 'filter_page'),
    htmlWebpackPluginCreator('searchMovies.html', 'common', 'search_page'),
    htmlWebpackPluginCreator('stats.html', 'common', 'stats_page'),
    htmlWebpackPluginCreator('sortMovies.html', 'common', 'sort_page'),
    htmlWebpackPluginCreator('indStats.html', 'common', 'ind_stats_page'),


    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './img',
          to: 'assets/img',
        },
        {
          from: './audio',
          to: 'assets/audio',
        },
        {
          from: '../favicon',
          to: 'favicon',
        },
      ],
    }),
  ];

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  entry: {
    index: ['@babel/polyfill', './js/handlers/login.js',  './style/style.css'],
    common: ['@babel/polyfill', './js/index.js', './style/style.css'],
    main_page: ['@babel/polyfill', './js/handlers/genres.js', './style/style.css'],
    user_table: ['@babel/polyfill', './js/handlers/user_table.js', './style/style.css'],
    registration_page: ['@babel/polyfill', './js/handlers/registration.js', './style/style.css'],
    reset_password_page: ['@babel/polyfill', './js/handlers/resetPassword.js', './style/style.css'],
    movies_page: ['@babel/polyfill', './js/handlers/movies.js', './style/style.css'],
    movies_simple_page: ['@babel/polyfill', './js/handlers/moviesSimple.js', './style/style.css'],
    menu_page: ['@babel/polyfill', './js/handlers/menu.js', './style/style.css'],
    filter_page: ['@babel/polyfill', './js/handlers/filterMovies.js', './style/style.css'],
    search_page: ['@babel/polyfill', './js/handlers/searchMovies.js', './style/style.css'],
    stats_page: ['@babel/polyfill', './js/handlers/stats.js', './style/style.css'],
    sort_page: ['@babel/polyfill', './js/handlers/sortMovies.js', './style/style.css'],
    ind_stats_page: ['@babel/polyfill', './js/handlers/indStats.js', './style/style.css'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev,
    contentBase: path.join(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/, //  на всякий случай
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/, // для шрифтов
        use: ['file-loader'],
      },
      {
        test: /\.csv$/,
        use: ['csv-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'audio',
              name: filename('mp3'),
            },
          },
        ],
      },
    ],
  },
};
