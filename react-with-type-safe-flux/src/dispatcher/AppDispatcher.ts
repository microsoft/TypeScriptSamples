import { Dispatcher } from 'flux';

export type Event = {type: string; payload: any};

const dispatcherInstance: Flux.Dispatcher<Event> = new Dispatcher();

export const AppDispatcher = dispatcherInstance;
