import React, { Component } from 'react';
import logo from './logo.png';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2 className="title">
            <span role="img" aria-label="super">
              ⚡
            </span>
            react
            <sup>-super-scripts</sup>
            <span role="img" aria-label="super">
              ⚡
            </span>
          </h2>
          <div className="subtitle">
            adds super powers to create-react-app and allows custom configs
            without ejecting
          </div>
        </div>
        <div className="description">
          <div className="links">
            <a
              href="https://www.npmjs.com/package/react-super-scripts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="npm">npm</div>
            </a>
            <a
              href="https://react-super-scripts.surge.sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="github">website</div>
            </a>
            <a
              href="https://github.com/shrynx/react-super-scripts/blob/develop/packages/react-scripts/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="readme">readme</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
