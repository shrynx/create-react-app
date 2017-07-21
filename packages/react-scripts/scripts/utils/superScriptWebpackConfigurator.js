'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const addlessLoader = ({ config, env }) => {
  const lessDevRule = {
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
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
      },
      require.resolve('less-loader'),
    ],
  };

  const lessProdRule = {
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            minimize: true,
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
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
        },
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
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
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
      },
      require.resolve('sass-loader'),
    ],
  };

  const sassProdRule = {
    test: /\.(sass|scss)$/,
    exclude: /\.module\.(sass|scss)$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: require.resolve('css-loader'),
          options: {
            minimize: true,
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
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
        },
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

  const loaderRule = rules.filter(rule => rule.loader === loaderType).shift();

  const useRule = useFilteredRules
    .filter(rule =>
      rule.use.includes(
        rule.use.filter(usedLoader => usedLoader === loaderType).shift()
      )
    )
    .shift();

  const useLoaderRule = useFilteredRules
    .filter(rule =>
      rule.use.includes(
        rule.use.filter(usedLoader => usedLoader.loader === loaderType).shift()
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
  const superScriptWebpackConfig = pipe(addSassLoader, addlessLoader);

  return superScriptWebpackConfig(configParam).config;
};

module.exports = superScriptWebpackConfigurator;
