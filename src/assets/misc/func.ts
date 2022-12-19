import { ICustomElement } from './types'

export function createCustomElement(data: ICustomElement) {
  const element = document.createElement(data.selector);
  element.className = data.class;
  if (data.options) {
      element.setAttribute('src', data.options.src);
      element.setAttribute('alt', data.options.alt);
  }
  return element;
}