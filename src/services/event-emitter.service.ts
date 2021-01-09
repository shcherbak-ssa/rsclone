const EVENT_EMITTER_ERROR: string = 'EventEmitterError';

type EventHandlers = Array<Function>;
type Events = Map<string, EventHandlers>;

class EventEmitterError implements Error {
  name: string = EVENT_EMITTER_ERROR;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class EventEmitter {
  private events: Events = new Map();
  private onceEvents: Events = new Map();

  on(event: string, handler: Function) {
    const eventHandlers: EventHandlers = this.getEventHandlers(event);
    eventHandlers.push(handler);
    
    this.events.set(event, eventHandlers);

    return this;
  }

  once(event: string, handler: Function) {
    const onceEventHandlers: EventHandlers = this.getOnceEventHandlers(event);
    onceEventHandlers.push(handler);
    
    this.onceEvents.set(event, onceEventHandlers);

    return this;
  }

  off(event: string, handler: Function) {
    if (!this.isEventExist(event)) return;

    const eventHandlers: EventHandlers = this.getEventHandlers(event);
    const updatedEventHandlers = this.removeHandler(eventHandlers, handler);
    
    if (updatedEventHandlers.length === 0) {
      this.events.delete(event);
    } else {
      this.events.set(event, updatedEventHandlers);
    }

    return this;
  }

  emit(event: string, payload?: any) {
    if (this.isOnceEventExist(event)) {
      const onceEventHandlers: EventHandlers = this.getOnceEventHandlers(event);
      this.executeHandlers(onceEventHandlers, payload);
      this.onceEvents.delete(event);
    }

    if (!this.isEventExist(event)) {
      throw new EventEmitterError(`Event '${event}' does not exist`);
    }

    const eventHandlers: EventHandlers = this.getEventHandlers(event);
    this.executeHandlers(eventHandlers, payload);
  }

  private getEventHandlers(event: string): EventHandlers {
    return this.events.get(event) || [];
  }

  private getOnceEventHandlers(event: string): EventHandlers {
    return this.onceEvents.get(event) || [];
  }

  private isEventExist(event: string) {
    return this.events.has(event);
  }

  private isOnceEventExist(event: string) {
    return this.onceEvents.has(event);
  }

  private removeHandler(eventHandlers: EventHandlers, handler: Function) {
    return eventHandlers.filter((eventHandler) => eventHandler !== handler);
  }

  private executeHandlers(eventHandlers: EventHandlers, payload?: any) {
    eventHandlers.forEach((handler) => handler(payload));
  }
}
