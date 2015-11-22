import './dependencies';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
const __react = React; // only in place to prevent React being purged from dependencies as not used directly

ReactDOM.render(<App />, document.getElementById('content'));
