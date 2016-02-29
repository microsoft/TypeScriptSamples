import FluxStore from './FluxStore';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';
import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import GreetingState from '../types/GreetingState';

class GreeterStore extends FluxStore<GreetingState> {
  constructor(dispatcher: Flux.Dispatcher<Event>) {
    const onDispatch = (action: Event) => {
      switch(action.type) {
        case GreetingActionTypes.ADD_GREETING:
          this._state.newGreeting = '';
          this._state.greetings = this._state.greetings.concat(action.payload);
          this.emitChange();
          break;
        case GreetingActionTypes.REMOVE_GREETING:
          this._state.greetings = this._state.greetings.filter(g => g !== action.payload);
          this.emitChange();
          break;
        case GreetingActionTypes.NEW_GREETING_CHANGED:
          this._state.newGreeting = action.payload;
          this.emitChange();
          break;
      }
    }
    super(dispatcher, onDispatch, () => ({
      greetings: [],
      newGreeting: ''
    }));
  }

  getState() {
    return this._state
  }
}

const greeterStoreInstance = new GreeterStore(AppDispatcher);
export default greeterStoreInstance;
