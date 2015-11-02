import FluxStore from './FluxStore';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import GreetingState from '../types/GreetingState';

class GreeterStore extends FluxStore<GreetingState> {
  constructor(dispatcher) {
    super(dispatcher, () => ({
      targetOfGreeting: 'James'
    }));
  }

  getState() {
    return this._state
  }

  _onDispatch(action) {
    switch(action.type) {
      case GreetingActionTypes.TARGET_OF_GREETING_CHANGED:
        this._state.targetOfGreeting = action.targetOfGreeting;
        this.emitChange();
        break;
    }
  }
}

const greeterStoreInstance = new GreeterStore(AppDispatcher);
export default greeterStoreInstance;
