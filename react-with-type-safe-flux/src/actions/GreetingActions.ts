import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';

export interface AddGreetingEvent {type: string; payload: string;}
export interface NewGreetingChanged {type: string; payload: string;}
export interface RemoveGreeting {type: string; payload: string;}

export function addGreeting(newGreeting: string) {
  AppDispatcher.dispatch({
    payload: newGreeting,
    type: GreetingActionTypes.ADD_GREETING
  } as AddGreetingEvent);
}

export function newGreetingChanged(newGreeting: string) {
  AppDispatcher.dispatch({
    payload: newGreeting,
    type: GreetingActionTypes.NEW_GREETING_CHANGED
  } as NewGreetingChanged);
}

export function removeGreeting(greetingToRemove: string) {
  AppDispatcher.dispatch({
    payload: greetingToRemove,
    type: GreetingActionTypes.REMOVE_GREETING
  } as RemoveGreeting);
}
