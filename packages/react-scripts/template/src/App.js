import React, {Component} from 'react';
import logo from 'src/logo.png';
import 'src/App.scss';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 className="App-title">⚡ react
                        <sup>-super-scripts</sup>⚡</h2>
                    <div className="App-subtitle">
                        adds super powers to create-react-app and allows custom configs without ejecting
                    </div>
                </div>
                <div className='App-description'>
                    <div className="links">
                        <div className="npm">
                            <a href="https://www.npmjs.com/package/react-super-scripts" target="_blank">npm</a>
                        </div>
                        <div className="github">
                            <a href="https://react-super-scripts.surge.sh" target="_blank">website</a>
                        </div>
                        <div className="readme">
                            <a href="https://github.com/shrynx/react-super-scripts/tree/master/packages/react-scripts" target="_blank">Full README</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
