import React, {Component} from 'react';
import logo from './logo.png';
import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 className="App-title">⚡ react <sup>-super-scripts</sup>⚡</h2>
                    <div className="App-subtitle">
                      adds super powers to create-react-app and allows custom configs without ejecting
                    </div>
                </div>
                <div className='App-description'>
                    <div className="intro">
                        <code>create-react-app my-app --scripts-version react-super-scripts</code>
                    </div>
                    <div className="help">
                        <p>* If you don't have Create React App, then</p>
                        <code>npm -g install create-react-app</code>
                    </div>
										<div className="links">
											<div className="npm">
											    <a href="https://www.npmjs.com/package/react-super-scripts" target="_blank">npm</a>
											</div>
											<div className="github">
											    <a href="https://github.com/shrynx/react-super-scripts" target="_blank">github</a>
											</div>
											<div className="readme">
											    <a href="https://github.com/shrynx/react-super-scripts/tree/master/packages/react-scripts" target="_blank">Full README</a>
											</div>
										</div>
                </div>
                <div className="App-features">
                    <h2>Features</h2>
                    <p>Apart from features provided by <a href="https://github.com/facebookincubator/create-react-app#whats-inside" target="_blank">CRA</a>, this package adds more goodies listed below.
										</p>
                    <h3>Webpack</h3>
                    <ul>
                        <li>
                            <strong>Webpack Dasboard</strong>
                            <ul>
                                <li>you got to love webpack dashboard</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Hot module replacement</strong>
                            <ul>
                                <li>supports HMR for js files too.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Supports SASS and LESS</strong>
                            <ul>
                                <li>write styles in css, sass or less</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Webpack image loader</strong>
                            <ul>
                                <li>for compressing images</li>
                            </ul>
                        </li>
                    </ul>
                    <h3>Babel</h3>
                    <ul>
                        <li>
                            <strong>Custom babel config</strong>
                            <ul>
                                <li>Want to use latest and greatest of javasript, no worries include custom babel presets by installing packages and adding them to <strong>.babelrc</strong> in root directory of the app</li>
                            </ul>
                        </li>
                    </ul>
                    <h3>ESLint</h3>
                    <ul>
                        <li>
                            <strong>Custom eslint config</strong>
                            <ul>
                                <li>Not happy with the default linting rules, simply include custom eslint by installing packages and adding them to <strong>.eslintrc</strong> in root directory of the app</li>
														</ul>
                        </li>
                    </ul>
                    <h3>Others</h3>
                    <ul>
                        <li>
                            <p>
                                <strong>Custom port</strong>
                            </p>
                            <ul>
                                <li>You can specify custom port for running development server.</li>
																<li>
																	<p>
																		In your package.json specify the port number to port property of react_super_scripts field. Your package.json should look like
																	</p>
																	<p>
																		<code>
																			{`
																				{
																					...

																					"react_super_scripts": {
																							"port": 3000
																					}
																				}

																			`}
																		</code>
																	</p>
																	<p>
																		a default port (3000) is already provided in package.json.
																	</p>
																</li>
                            </ul>
                        </li>
                        <li>
                            <p>
                                <strong>Custom entry point</strong>
                            </p>
                            <ul>
                                <li>You can specify app entry point for wepack.</li>
																<li>
																	<p>
																		In your package.json specify the file path to appEntry property of react_super_scripts field. Your package.json should look like
																	</p>
																	<p>
																		<code>
																			{`
																				{
																					...

																					"react_super_scripts": {
																							"appIndex": "src/index.js"
																					}
																				}

																			`}
																		</code>
																	</p>
																	<p>
																		a default entry point (src/index.js) is already provided in package.json.
																	</p>
																</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
