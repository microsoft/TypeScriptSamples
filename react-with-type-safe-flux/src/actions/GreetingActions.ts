import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';

export function addGreeting(newGreeting: string) {
  AppDispatcher.dispatch({
    payload: newGreeting,
    type: GreetingActionTypes.ADD_GREETING
  });
}

export function newGreetingChanged(newGreeting: string) {
  AppDispatcher.dispatch({
    payload: newGreeting,
    type: GreetingActionTypes.NEW_GREETING_CHANGED
  });
}

export function removeGreeting(greetingToRemove: string) {
  AppDispatcher.dispatch({
    payload: greetingToRemove,
    type: GreetingActionTypes.REMOVE_GREETING
  });
}
