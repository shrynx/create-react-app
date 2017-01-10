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
* **Faster builds**
	* added happyloader (pre configured).
	* you can enable it by setting webpackCache as true in react_super_script in package.json
   ```js
	 {
		...

		"react_super_scripts": {
			"webpackCache": true
		}
	 }
  ```
* **Hot module replacement**
	*  supports HMR for js files too.
* **Supports SASS and LESS**
	* write styles in css, sass or less
* **Webpack image loader**
	* for compressing images
* **Offline Plugin**
	* You can generate service worker for your web app, simply by adding offline to true
	in react_super_script in package.json
       ```js
        {
		    ...

		     "react_super_scripts": {
			  "offline": true
		     }
        }
      ```
	* **Note**: You would also need to require offline plugin in your app entry point. it is always
	recommended to do so for production build.
	At the end of your app entry file just add these lines of code.
       ```js
        // src/index.js
		    ...

		     if (process.env.NODE_ENV === 'production') {
		          require('offline-plugin/runtime').install();
		     }

      ```

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
* **Custom port**
	* You can specify custom port for running development server.
	* In your package.json specify the port number to port property
		of react_super_scripts field.
	Your package.json should look like
       ```js
        {
		    ...

		     "react_super_scripts": {
			  "port": 3000
		     }
        }
      ```
	     a default port (3000) is already provided in package.json.
	* **Note**: if you have specified PORT in your environment variable
	then environment variable will override your custom port from package.json.
	Also if you don't provide port in your package.json and nor in your environment variable it will default to 3000.

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

* **Custom development browser**
	* You can specify your browser for automatically running during development.
	* In your package.json specify the browser to defaultBrowser property
		of react_super_scripts field.
	Your package.json should look like
       ```js
        {
		    ...

		     "react_super_scripts": {
			  "defaultBrowser": "firefox"
		     }
        }
      ```
	* The available options are **chrome**, **firefox**, **safari** (OSX/macOS only) and **ie** (windows only).
        You can also specify it as "none", if you don't want any browser to be running.    
	* **Note**: If you provide a browser that is not available on your system
	it will not run any browser
* **Want moarrr ?**
	* [Tell me](https://github.com/shrynx/react-super-scripts/issues)

## Plans
* **Support this fork to be always in sync with `create-react-app` and `react-scripts`**
* **Add boilerplate generator options**
  * Give user choice to generate basic app (like the one now) or
  generate app with redux and react-router
