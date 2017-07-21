'use strict';

const paths = require('../../config/paths');

const packageConfig = require(paths.appPackageJson);

const superScriptConfigOption = param => {
  if (packageConfig.react_super_scripts) {
    if (packageConfig.react_super_scripts[param]) {
      return packageConfig.react_super_scripts[param];
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = superScriptConfigOption;
