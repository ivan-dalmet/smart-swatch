import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactGA.initialize('UA-137797247-3');
ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
