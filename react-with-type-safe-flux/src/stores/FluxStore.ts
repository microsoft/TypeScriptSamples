import { EventEmitter } from 'events';
import { Event } from '../dispatcher/AppDispatcher';

const CHANGE_EVENT = 'change';

class FluxStore<TState> {
  _changed: boolean;
  _emitter: EventEmitter;
  dispatchToken: string;
  _dispatcher: Flux.Dispatcher<Event>;
  _cleanStateFn: () => TState;
  _state: TState;

  constructor(dispatcher: Flux.Dispatcher<Event>, protected _onDispatch: (action: Event) => void, cleanStateFn: () => TState) {
    this._emitter = new EventEmitter();
    this._changed = false;
    this._dispatcher = dispatcher;
    this.dispatchToken = dispatcher.register((payload: Event) => {
      this._invokeOnDispatch(payload);
    });

    this._cleanStateFn = cleanStateFn;
    this._state = this._cleanStateFn();
  }

  /**
   * Is idempotent per dispatched event
   */
  emitChange() {
    this._changed = true;
  }

  hasChanged() { return this._changed; }

  addChangeListener(callback: () => void) {
    this._emitter.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: () => void) {
    this._emitter.removeListener(CHANGE_EVENT, callback);
  }

  _cleanState() {
    this._changed = false;
    this._state = this._cleanStateFn();
  }

  _invokeOnDispatch(payload: Event) {
    this._changed = false;
    this._onDispatch(payload);
    if (this._changed) {
      this._emitter.emit(CHANGE_EVENT);
    }
  }
}

export default FluxStore;
