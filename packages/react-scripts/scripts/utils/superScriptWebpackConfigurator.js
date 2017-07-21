'use strict';

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
  const superScriptWebpackConfig = pipe(param => param);

  return superScriptWebpackConfig(configParam).config;
};

module.exports = superScriptWebpackConfigurator;
