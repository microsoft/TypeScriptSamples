import { Dispatcher } from 'flux';

export type Event = {type: string};

const dispatcherInstance: Flux.Dispatcher<Event> = new Dispatcher();

export const AppDispatcher = dispatcherInstance;
