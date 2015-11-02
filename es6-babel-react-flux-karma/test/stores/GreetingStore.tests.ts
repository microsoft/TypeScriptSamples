import GreetingStore from '../../src/stores/GreetingStore';
import GreetingActionTypes from '../../src/constants/action-types/GreetingActionTypes';

const registeredCallback = GreetingStore._onDispatch.bind(GreetingStore);

describe('GreetingStore', () => {
  beforeEach(() => {
    GreetingStore._cleanState();
  });

  it('given no actions, targetOfGreeting should be \'James\'', () => {
    const { targetOfGreeting } = GreetingStore.getState();

    expect(targetOfGreeting).toEqual('James');
  });

  it('given an action with a targetOfGreeting of \'Benjamin\', the state targetOfGreeting should be \'Benjamin\'', () => {
    [{
      targetOfGreeting: 'Benjamin',
      type: GreetingActionTypes.TARGET_OF_GREETING_CHANGED,
    }].forEach(registeredCallback);

    const { targetOfGreeting } = GreetingStore.getState();

    expect(targetOfGreeting).toEqual('Benjamin');
  });
});
