const HIDDEN_OVERFLOW_STRING: string = 'hidden';
const EMPTY_OVERFLOW_STRING: string = '';

export class DocumentBodyService {
  body: HTMLElement;

  constructor() {
    this.body = document.body;
  }

  setOveflowHidden(): DocumentBodyService {
    this.body.style.overflow = HIDDEN_OVERFLOW_STRING;
    return this;
  }

  removeOverflowHidden(): DocumentBodyService {
    this.body.style.overflow = EMPTY_OVERFLOW_STRING;
    return this;
  }

  addClass(classname: string): DocumentBodyService {
    this.body.classList.add(classname);
    return this;
  }

  removeClass(classname: string): DocumentBodyService {
    this.body.classList.remove(classname);
    return this;
  }

  toggleClass(classname: string): DocumentBodyService {
    this.body.classList.toggle(classname);
    return this;
  }

  hasClass(classname: string): boolean {
    return this.body.classList.contains(classname);
  }
};
