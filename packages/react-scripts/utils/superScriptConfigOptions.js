var paths = require('../config/paths');

var packageConfig = require(paths.appPackageJson);

function superScriptConfigOptions(param) {
  if (packageConfig.react_super_scripts) {
    if (packageConfig.react_super_scripts[param]) {
        return packageConfig.react_super_scripts[param]
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = superScriptConfigOptions;
