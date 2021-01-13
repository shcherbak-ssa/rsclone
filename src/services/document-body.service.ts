const HIDDEN_OVERFLOW_STRING: string = 'hidden';
const EMPTY_OVERFLOW_STRING: string = '';

export class DocumentBodyService {
  body: HTMLElement;

  constructor() {
    this.body = document.body;
  }

  setOveflowHidden() {
    this.body.style.overflow = HIDDEN_OVERFLOW_STRING;
  }

  removeOverflowHidden() {
    this.body.style.overflow = EMPTY_OVERFLOW_STRING;
  }

  addClass(classname: string) {
    this.body.classList.add(classname);
  }

  removeClass(classname: string) {
    this.body.classList.remove(classname);
  }
};
