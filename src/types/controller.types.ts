export interface Controller {
  on(event: string, handler: Function): Controller;
  once(event: string, handler: Function): Controller;
  off(event: string, handler: Function): Controller;
  emit(event: string, payload?: any): void;
}
