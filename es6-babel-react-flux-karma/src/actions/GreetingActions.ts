import AppDispatcher from '../dispatcher/AppDispatcher';
import GreetingActionTypes from '../constants/action-types/GreetingActionTypes';

export function greetingChanged(targetOfGreeting: string) {
  AppDispatcher.dispatch({
    targetOfGreeting,
    type: GreetingActionTypes.TARGET_OF_GREETING_CHANGED,
  });
}
