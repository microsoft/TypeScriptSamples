import * as React from 'react';
import GreetingStore from '../stores/GreetingStore';
import * as GreetingActions from '../actions/GreetingActions';
import GreetingState from '../types/GreetingState';
import WhoToGreet from './WhoToGreet';
import Greeting from './Greeting';

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
    const { greetings, newGreeting } = this.state;
    return (
      <div className="container-fluid">
        <h1>Hello People!</h1>

        <WhoToGreet newGreeting={ newGreeting } />

        { greetings.map((g, index) => <Greeting key={ index } targetOfGreeting={ g } />) }
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
