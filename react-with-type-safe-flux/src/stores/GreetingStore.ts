import FluxStore from './FluxStore';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';
import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import GreetingState from '../types/GreetingState';
import { AddGreetingEvent, RemoveGreeting, NewGreetingChanged } from '../actions/GreetingActions';

class GreeterStore extends FluxStore<GreetingState> {
  constructor(dispatcher: Flux.Dispatcher<Event>) {
    const onDispatch = (action: Event) => {
      if (action instanceof AddGreetingEvent) {
        const {payload} = action;
        this._state.newGreeting = '';
        this._state.greetings = this._state.greetings.concat(payload);
        this.emitChange();
      } else if (action instanceof RemoveGreeting) {
        const {payload} = action;
        this._state.greetings = this._state.greetings.filter(g => g !== payload);
        this.emitChange();
      } else if (action instanceof NewGreetingChanged) {
        const {payload} = action;
        this._state.newGreeting = payload;
        this.emitChange();
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
