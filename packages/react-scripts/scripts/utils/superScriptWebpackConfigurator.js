'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const paths = require('../../config/paths');

const updateBabelConfig = ({ config, env }) => {
  const babelDevConfig = {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      // @remove-on-eject-begin
      babelrc: true,
      presets: [require.resolve('babel-preset-react-app'), 'react-hmre'],
      // @remove-on-eject-end
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
    },
  };

  const babelProdConfig = {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      // @remove-on-eject-begin
      babelrc: true,
      presets: [require.resolve('babel-preset-react-app')],
      // @remove-on-eject-end
      compact: true,
    },
  };

  return env === 'dev'
    ? { config: updateRule(config, 'babel-loader', babelDevConfig), env }
    : { config: updateRule(config, 'babel-loader', babelProdConfig), env };
};

const addImageLoader = ({ config, env }) => {
  const imageRule = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loaders: [
      {
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        loader: require.resolve('image-webpack-loader'),
        query: {
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          svgo: {
            plugins: [
              {
                removeViewBox: false,
              },
              {
                removeEmptyAttrs: false,
              },
            ],
          },
        },
      },
    ],
  };
  return env === 'prod'
    ? { config: updateRule(config, 'url-loader', imageRule), env }
    : { config, env };
};

const addlessLoader = ({ config, env }) => {
  const lessDevRule = {
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: [
      require.resolve('style-loader'),
      cssDevLoader,
      postcssDevLoader,
      require.resolve('less-loader'),
    ],
  };

  const lessProdRule = {
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: ExtractTextPlugin.extract({
      use: [
        cssProdLoader,
        postcssProdLoader,
        {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
          },
        },
      ],
      fallback: require.resolve('style-loader'),
    }),
  };

  return env === 'dev'
    ? { config: addRule(config, lessDevRule), env }
    : { config: addRule(config, lessProdRule), env };
};

const addSassLoader = ({ config, env }) => {
  const sassDevRule = {
    test: /\.(sass|scss)$/,
    exclude: /\.module\.(sass|scss)$/,
    use: [
      require.resolve('style-loader'),
      cssDevLoader,
      postcssDevLoader,
      require.resolve('sass-loader'),
    ],
  };

  const sassProdRule = {
    test: /\.(sass|scss)$/,
    exclude: /\.module\.(sass|scss)$/,
    use: ExtractTextPlugin.extract({
      use: [
        cssProdLoader,
        postcssProdLoader,
        {
          loader: require.resolve('sass-loader'),
          options: {
            sourceMap: true,
          },
        },
      ],
      fallback: require.resolve('style-loader'),
    }),
  };

  return env === 'dev'
    ? { config: addRule(config, sassDevRule), env }
    : { config: addRule(config, sassProdRule), env };
};

const cssDevLoader = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
  },
};

const cssProdLoader = {
  loader: require.resolve('css-loader'),
  options: {
    minimize: true,
    importLoaders: 1,
    sourceMap: true,
  },
};

const postcssDevLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ],
  },
};

const postcssProdLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ],
  },
};

/**
 * add specific rule to webpack config
 * @param {Object} config 
 * @param {Object} rule 
 */
const addRule = (config, newRule) => {
  config.module.rules[1].oneOf.splice(-1, 0, newRule);
  return config;
};

/**
 * find specific loader type rule in webpack config
 * @param {Object} config 
 * @param {String} loaderType 
 */
const findRule = (config, loaderType) => {
  const rules = config.module.rules[1].oneOf;
  const useFilteredRules = rules.filter(rule => rule.use);

  const loaderRule = rules
    .filter(
      rule =>
        typeof rule.loader === 'string' && rule.loader.includes(loaderType)
    )
    .shift();

  const useRule = useFilteredRules
    .filter(rule =>
      rule.use.includes(
        rule.use
          .filter(
            useLoader =>
              typeof useLoader === 'string' && useLoader.includes(loaderType)
          )
          .shift()
      )
    )
    .shift();

  const useLoaderRule = useFilteredRules
    .filter(rule =>
      rule.use.includes(
        rule.use
          .filter(
            useLoader =>
              typeof useLoader.loader === 'string' &&
              useLoader.loader.includes(loaderType)
          )
          .shift()
      )
    )
    .shift();

  return loaderRule ? loaderRule : useRule ? useRule : useLoaderRule;
};

/**
 * remove specific loader type rule from webpack config
 * @param {Object} config 
 * @param {String} loaderType 
 */
const removeRule = (config, loaderType) => {
  const rules = config.module.rules[1].oneOf;
  const indexOfLoader = rules.indexOf(findRule(config, loaderType));
  config.module.rules[1].oneOf.splice(indexOfLoader, 1);

  return config;
};

/**
 * update specific loader type rule in webpack config
 * @param {Object} config 
 * @param {String} loaderType 
 * @param {Object} rule 
 */
const updateRule = (config, loaderType, rule) => {
  const rules = config.module.rules[1].oneOf;
  const indexOfLoader = rules.indexOf(findRule(config, loaderType));
  config.module.rules[1].oneOf[indexOfLoader] = rule;

  return config;
};

const pipe = (headFn, ...restFns) => (...args) =>
  restFns.reduce((value, fn) => fn(value), headFn(...args));

const superScriptWebpackConfigurator = (config, env) => {
  const configParam = { config, env };
  const superScriptWebpackConfig = pipe(
    addSassLoader,
    addlessLoader,
    addImageLoader,
    updateBabelConfig
  );

  return superScriptWebpackConfig(configParam).config;
};

module.exports = superScriptWebpackConfigurator;
