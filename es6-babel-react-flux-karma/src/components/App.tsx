import * as React from 'react';
import GreetingStore from '../stores/GreetingStore';
import * as GreetingActions from '../actions/GreetingActions';
import GreetingState from '../types/GreetingState';
import WhoToGreet from './WhoToGreet';

class App extends React.Component<any, GreetingState> {
  constructor(props) {
    super(props);
    this.state = this._getStateFromStores();
  }

  componentWillMount() {
    GreetingStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    GreetingStore.removeChangeListener(this._onChange);
  }

  render() {
    const { targetOfGreeting } = this.state;
    return (
      <div className="container-fluid">
        <h1>Hello { targetOfGreeting }</h1>

        <WhoToGreet targetOfGreeting={ targetOfGreeting } />
      </div>
    );
  }

  _onChange = () => {
    this.setState(this._getStateFromStores());
  }

  _getStateFromStores() {
    return GreetingStore.getState();
  }
}

export default App;
