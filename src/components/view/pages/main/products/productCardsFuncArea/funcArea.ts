import { createCustomElement } from '../../../../../../assets/misc/func';
import * as types from '../../../../../../assets/misc/types';
import Products from '../../../../../../products';
import "./funcArea.scss";

class FuncArea {

  createSort() {
    const sort = <HTMLSelectElement>createCustomElement({selector : 'select', class : `card__sort`});
    console.log(Object.keys(types.CardSort));
    Object.values(types.CardSort).forEach((element, i) => {
      const option = <HTMLOptionElement>createCustomElement({selector : 'option', class : `sort__option`});
      option.textContent = `${element}`.split('_').join(' ');
      option.value = `${element}`;
      if (i === 0) {
        option.textContent += ':';
        option.disabled = true;
        option.selected = true;
      }
      sort.appendChild(option);
    });
    return sort;
  }

  createFind() {
    const found = <HTMLDivElement>createCustomElement({selector : 'div', class : `card__found`});
    const foundText = <HTMLSpanElement>createCustomElement({selector : 'span', class : `found__text`});
    const foundCount = <HTMLSpanElement>createCustomElement({selector : 'span', class : `found__count`});
    foundText.textContent = 'Found: ';
    foundCount.textContent = `${Products.length}`;
    found.appendChild(foundText);
    found.appendChild(foundCount);
    return found;
  }

  createSearch() {
    const search = <HTMLInputElement>createCustomElement({selector : 'input', class : `card__search`});
    search.type = 'search';
    search.placeholder = 'Search product';
    return search;
  }

  createDisplay() {
    const displayArea = <HTMLDivElement>createCustomElement({selector : 'div', class : `card__display-area`});
    const displaySmall = <HTMLButtonElement>createCustomElement({selector : 'button', class : `card__display small`});
    const displayLarge = <HTMLButtonElement>createCustomElement({selector : 'button', class : `card__display large`});
    displayArea.appendChild(displaySmall);
    displayArea.appendChild(displayLarge);
    return displayArea;
  }

  createCardFuncsArea() {
    const funcArea = <HTMLDivElement>createCustomElement({selector : 'div', class : `product__funcs`});
    funcArea.appendChild(this.createSort());
    funcArea.appendChild(this.createFind());
    funcArea.appendChild(this.createSearch());
    funcArea.appendChild(this.createDisplay());
    return funcArea;
  }

  draw() {
    (document.querySelector('.product__container') as HTMLDivElement).appendChild(this.createCardFuncsArea());
  }
}

export default FuncArea;