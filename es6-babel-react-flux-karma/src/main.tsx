import './dependencies';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
React; // use React as an expression to prevent React being purged from dependencies as not used directly

ReactDOM.render(<App />, document.getElementById('content'));
