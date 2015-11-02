import * as React from 'react/addons';
import WhoToGreet from '../../src/components/WhoToGreet';
import * as GreetingActions from '../../src/actions/GreetingActions';

const { TestUtils } = React.addons;

describe('WhoToGreet', () => {
  let handleSelectionChangeSpy: jasmine.Spy;
  beforeEach(() => {
    handleSelectionChangeSpy = jasmine.createSpy('handleSelectionChange');
  });

  it('given a targetOfGreeting of \'Benjamin\' then it renders an input containing that text', () => {
    const targetOfGreeting = 'Benjamin';
    const whoToGreet = render({ targetOfGreeting });

    expect(whoToGreet.type).toBe('input');
    expect(whoToGreet.props.type).toBe('text');
    expect(whoToGreet.props.value).toBe(targetOfGreeting);
  });

  it('onChange triggers a greetingChanged action', () => {
    const targetOfGreeting = 'Benjamin';
    const whoToGreet = render({ targetOfGreeting });
    spyOn(GreetingActions, 'greetingChanged');

    whoToGreet.props.onChange({ target: { value: targetOfGreeting }});

    expect(GreetingActions.greetingChanged).toHaveBeenCalledWith(targetOfGreeting);
  });

  function render({ targetOfGreeting }) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WhoToGreet targetOfGreeting={ targetOfGreeting } />);
    return shallowRenderer.getRenderOutput();
  }
});
