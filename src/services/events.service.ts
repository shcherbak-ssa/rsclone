const EVENTS_ERROR: string = 'EventsError';

class EventsError implements Error {
  name: string = EVENTS_ERROR;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class Events {
  private events: Map<string, Array<Function>> = new Map();

  on(event: string, handler: Function) {
    const eventHandlers: Array<Function> = this.getEventHandlers(event);
    eventHandlers.push(handler);
    
    this.events.set(event, eventHandlers);

    return this;
  }

  off(event: string, handler: Function) {
    if (!this.isEventExist(event)) return;

    const eventHandlers: Array<Function> = this.getEventHandlers(event);
    this.removeHandler(eventHandlers, handler);

    return this;
  }

  emit(event: string, payload?: any) {
    if (!this.isEventExist(event)) {
      throw new EventsError(`Event '${event}' does not exist`);
    }

    const eventHandlers: Array<Function> = this.getEventHandlers(event);
    eventHandlers.forEach((handler) => handler(payload));
  }

  private getEventHandlers(event: string): Array<Function> {
    return this.events.get(event) || [];
  }

  private isEventExist(event: string) {
    return this.events.has(event);
  }

  private removeHandler(eventHandlers: Array<Function>, handler: Function) {
    eventHandlers.filter((eventHandler) => eventHandler !== handler);
  }
}
