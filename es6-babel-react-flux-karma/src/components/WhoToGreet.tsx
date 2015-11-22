import * as React from 'react';
import * as GreetingActions from '../actions/GreetingActions';

interface Props {
  targetOfGreeting: string;
}

class WhoToGreet extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  static propTypes: React.ValidationMap<Props> = {
    targetOfGreeting: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <input type="text" value={ this.props.targetOfGreeting } onChange={ this._handleTargetOfGreetingChange } />
    );
  }

  _handleTargetOfGreetingChange = (event) => {
    const { target: { value: targetOfGreeting } } = event;
    GreetingActions.greetingChanged(targetOfGreeting);
  }
}

export default WhoToGreet;
