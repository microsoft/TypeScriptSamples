import * as React from 'react';
import GreetingStore from '../stores/GreetingStore';
import * as GreetingActions from '../actions/GreetingActions';
import GreetingState from '../types/GreetingState';
import WhoToGreet from './WhoToGreet';
import Greeting from './Greeting';

class App extends React.Component<{}, GreetingState> {
  constructor(props: {}) {
    super(props);
    this.state = this.getStateFromStores();
  }
  private onChange = () => {
    this.setState(this.getStateFromStores());
  }

  public componentWillMount() {
    GreetingStore.addChangeListener(this.onChange);
  }

  public componentWillUnmount() {
    GreetingStore.removeChangeListener(this.onChange);
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

  private getStateFromStores() {
    return GreetingStore.getState();
  }
}

export default App;
