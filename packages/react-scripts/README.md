<a href='https://github.com/shrynx/react-super-scripts'><p align='center'><img src='https://raw.githubusercontent.com/shrynx/react-super-scripts/develop/packages/react-scripts/template/src/logo.png' height='100' ></p></a>

# ⚡ react <sup>-super-scripts</sup> ⚡

**This package adds super powers and allows custom configs without ejecting [Create React App](https://github.com/facebookincubator/create-react-app)**

⚠️ This is not a fork of create-react-app, it is just a fork of react-scripts.

#### Create bootstraped React apps simply by

`create-react-app my-app --scripts-version react-super-scripts`

<sup>* If you don't have Create React App, then</sup>
<sup>`npm -g install create-react-app`</sup>

## Features
Apart from features provided by [CRA](https://github.com/facebookincubator/create-react-app#whats-inside), this package adds more goodies listed below.

### Webpack
* **Webpack Dasboard**
	* you got to love webpack dashboard
	* Webpack dashboard is turned on by default,but it is configurable
	* you can disable it able it setting dashboard as false in react_super_script in package.json
    ```js
      {
        ...

        "react_super_scripts": {
          "dashboard": true
        }
      }
    ```
* **Hot module replacement**
	*  supports HMR for js files too.
* **Supports SASS and LESS**
	* write styles in css, sass or less
* **Webpack image loader**
	* for compressing images
* **Vendor splitting**
  * you can split out vendor files from app logic, simply by creating a `vendor.js` file in `src` folder,
  and import all your vendor dependencies in that file.
* **Build Progress Bar**
  * During build process a progress bar is shown.

### Babel
* **Custom babel config**
	* Want to use latest and greatest of javascript, no worries
		include custom babel presets by installing packages
		and adding them to **.babelrc** in root directory of the app
	* **Note**: This will completly override existing presets.
		You will need to create the .babelrc file inside your app folder
		and remember to add **react-hmre** preset to babel development.
		This script relies on react-hmre for hot module replacement.

### ESLint
* **Custom eslint config**
	* Not happy with the default linting rules,
		simply include custom eslint by installing packages
		and adding them to **.eslintrc** in root directory of the app
	* **Note**: This will completly override existing linting rules.
		You will need to create the .eslintrc file inside your app folder.

### Preact
* **Using preact instead of react**
	* [Preact](https://github.com/developit/preact) is a fast, 3kB alternative to React, with the same ES2015 API,
	* In your package.json add usePreact to react-super-scripts and set it to true.
	Your package.json should look like
    ```js
      {
        ...

        "react_super_scripts": {
          "usePreact": true
        }
      }
    ```
    
	Then uninstall ```react``` and ```react-dom``` and install ```preact``` and ```preact-compat```

	```npm uninstall react react-dom && npm install --save preact preact-compat```
	* You can keep using you existing react code without any changes, under the hood
		webpack will alias react and react-dom to use preact.
	* **Note**: This package uses ```preact-compat``` for maintaining compatibility with react.
		This doesn't guarantee complete compatibility, test all features fully first.

### Others

* **Custom entry point**
	* You can specify app entry point for webpack.
	* In your package.json specify the file path to appEntry property
		of react_super_scripts field.
	Your package.json should look like
    ```js
      {
        ...

        "react_super_scripts": {
          "appEntry": "src/index.js"
        }
      }
    ```
	a default entry point (src/index.js) is already provided in package.json.
	* **Note**: if you don't provide appEntry in your package.json it will default to scr/index.js

This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).<br>
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.
