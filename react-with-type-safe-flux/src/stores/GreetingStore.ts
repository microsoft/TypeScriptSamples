import FluxStore from './FluxStore';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import GreetingState from '../types/GreetingState';

class GreeterStore extends FluxStore<GreetingState> {
  constructor(dispatcher) {
    super(dispatcher, () => ({
      greetings: [],
      newGreeting: ''
    }));
  }

  getState() {
    return this._state
  }

  _onDispatch(action) {
    switch(action.type) {
      case GreetingActionTypes.ADD_GREETING:
        this._state.newGreeting = '';
        this._state.greetings = this._state.greetings.concat(action.newGreeting);
        this.emitChange();
        break;
      case GreetingActionTypes.REMOVE_GREETING:
        this._state.greetings = this._state.greetings.filter(g => g !== action.greetingToRemove);
        this.emitChange();
        break;
      case GreetingActionTypes.NEW_GREETING_CHANGED:
        this._state.newGreeting = action.newGreeting;
        this.emitChange();
        break;
    }
  }
}

const greeterStoreInstance = new GreeterStore(AppDispatcher);
export default greeterStoreInstance;
