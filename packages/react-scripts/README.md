# ⚡ react <sup>-super-scripts</sup> ⚡

![Imgur](http://i.imgur.com/a5MW7i3.png)

**This package adds super powers and allows custom configs without ejecting [Create React App](https://github.com/facebookincubator/create-react-app)**

⚠️ This is a fork of react-scripts.

#### Create bootstraped React apps simply by

```
create-react-app my-app --scripts-version react-super-scripts
```

<sup>* If you don't have Create React App, then</sup>
<sup>`npm -g install create-react-app`</sup>

## Features
Apart from features provided by [CRA](https://github.com/facebookincubator/create-react-app#whats-inside), this package adds more goodies listed below.

### Webpack
* **Webpack Dasboard**
	* you got to love webpack dashboard
* **Hot module replacement**
	*  supports HMR for js files too.
* **Supports SASS and LESS**
	* write styles in css, sass or less
* **Webpack image loader**
	* for compressing images

### Babel
* **Custom babel config**
	* Want to use latest and greatest of javasript, no worries
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

### Others
* **Custom port**
	* You can specify custom port for running development server.
	* In you package.json specify the port number to port property
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
	* You can specify app entry point for wepack.
	* In you package.json specify the file path to appEntry property
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
* **Want moarrr ?**
	* [Please tell me](https://github.com/shrynx/react-super-scripts/issues)

## Plans
* **Support this fork to be always in sync with `create-react-app` and `react-scripts`**
* **Add boilerplate generator options**
  * Give user choice to generate basic app (like the one now) or
  generate app with redux and react-router
