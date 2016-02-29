import FluxStore from './FluxStore';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';
import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import GreetingState from '../types/GreetingState';
import { AddGreetingEvent, RemoveGreeting, NewGreetingChanged } from '../actions/GreetingActions';

class GreeterStore extends FluxStore<GreetingState> {
  constructor(dispatcher: Flux.Dispatcher<Event>) {
    const onDispatch = (action: Event) => {
      switch(action.type) {
        case GreetingActionTypes.ADD_GREETING:
          let payload1 = (<AddGreetingEvent> action).payload;
          this._state.newGreeting = '';
          this._state.greetings = this._state.greetings.concat(payload1);
          this.emitChange();
          break;
        case GreetingActionTypes.REMOVE_GREETING:
          let payload2 = (<RemoveGreeting> action).payload;
          this._state.greetings = this._state.greetings.filter(g => g !== payload2);
          this.emitChange();
          break;
        case GreetingActionTypes.NEW_GREETING_CHANGED:
          let payload3 = (<NewGreetingChanged> action).payload;
          this._state.newGreeting = payload3;
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
