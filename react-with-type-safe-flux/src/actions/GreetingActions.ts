import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';

export function addGreeting(newGreeting: string) {
  AppDispatcher.dispatch({
    newGreeting,
    type: GreetingActionTypes.ADD_GREETING
  } as Event);
}

export function newGreetingChanged(newGreeting: string) {
  AppDispatcher.dispatch({
    newGreeting,
    type: GreetingActionTypes.NEW_GREETING_CHANGED
  } as Event);
}

export function removeGreeting(greetingToRemove: string) {
  AppDispatcher.dispatch({
    greetingToRemove,
    type: GreetingActionTypes.REMOVE_GREETING
  } as Event);
}
