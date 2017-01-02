/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var execSync = require('child_process').execSync;
var opn = require('opn');
var superScriptConfigOptions = require('./superScriptConfigOptions')

var defaultBrowser = superScriptConfigOptions('defaultBrowser')

var AppPlatformNames = {
  chrome: {
    darwin: "google chrome",
    linux: "google-chrome",
    win32: "chrome"
  },
  firefox: {
    darwin: "firefox",
    linux: "firefox",
    win32: "firefox"
  },
  safari: {
    darwin: "safari",
  },
  ie: {
    win32: "iexplore.exe"
  }
}

var runChromeOnMac = function(url) {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync(
        'osascript openChrome.applescript ' + url,
        {cwd: __dirname, stdio: 'ignore'}
      );
      return true;
    } catch (err) {
      // Ignore errors.
    }
}

var tryOpeningUrlOnApp = function(url, appName) {
  try {
    opn(url, {app: appName}).catch(() => {}); // Prevent `unhandledRejection` error.
    return true;
  } catch (err) {
    return false;
  }
}

function openBrowser(url) {
  if(defaultBrowser) {

    switch(defaultBrowser) {
      case "chrome":
        if (process.platform === 'darwin') {
          runChromeOnMac(url)
        } else {
          tryOpeningUrlOnApp(url, AppPlatformNames.chrome[process.platform])
        }
        break;
      case "firefox":
        tryOpeningUrlOnApp(url, AppPlatformNames.firefox[process.platform])
        break;
      case "safari":
        if (process.platform === 'darwin') {
          tryOpeningUrlOnApp(url, AppPlatformNames.safari[process.platform])
        } else {
          return false
        }
        break;
      case "ie":
        if (process.platform === 'win32') {
          tryOpeningUrlOnApp(url, AppPlatformNames.ie[process.platform])
        } else {
          return false
        }
        break;
      case "none":
          return false;
          break;
      default:
        try {
          opn(url).catch(() => {}); // Prevent `unhandledRejection` error.
          return true;
        } catch (err) {
          return false;
        }
    }

  } else {
    // if no browser options are configured in package.json
    if (process.platform === 'darwin') {
      runChromeOnMac(url)
    } else {
      // Fallback to opn
      // (It will always open new tab)
      try {
        opn(url).catch(() => {}); // Prevent `unhandledRejection` error.
        return true;
      } catch (err) {
        return false;
      }
    }
  }
}

module.exports = openBrowser;
