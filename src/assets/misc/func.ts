import { ICustomElement, ISortObj } from './types'

export function createCustomElement(data: ICustomElement) {
  const element = document.createElement(data.selector);
  element.className = data.class;
  if (data.options) {
      element.setAttribute('src', data.options.src);
      element.setAttribute('alt', data.options.alt);
  }
  return element;
}

export function quickSort(arr: ISortObj[], sortType: string): ISortObj[] {
  if (arr.length < 2) return arr;
  let curr: ISortObj = arr[0];
  const left: ISortObj[] = [];
  const right: ISortObj[] = [];
  for (let i = 1; i < arr.length; i++) {
    if (curr.amount > arr[i].amount) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left, sortType).concat(curr, quickSort(right, sortType));
}