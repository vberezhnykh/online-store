import { createCustomElement, quickSort } from '../../../../../../assets/misc/func';
import * as types from '../../../../../../assets/misc/types';
import Products from '../../../../../../products';
import "./funcArea.scss";

class FuncArea {

  sort(e: Event) {
    const option  = (e.target as HTMLSelectElement).value;
    if (option !== 'Sort_options') {
      let arr: types.ISortObj[] = [];
      const cat = option.split('_').reverse()[1];
      const sortType = option.split('_').reverse()[0];
      const categories = document.querySelectorAll(`.${cat}`) as NodeListOf<HTMLSpanElement>;
      for (let i = 0; i < categories.length; i++) {
        const value = categories[i].textContent?.trim() as string;
        const parent = categories[i] as HTMLSpanElement;
        const obj : types.ISortObj = {order: 0, amount: 0};
        obj.order = Number((parent.closest('.card__wrapper') as HTMLDivElement).style.order);
        obj.amount = parseFloat(value);
        arr.push(obj);
      }
      const sortedArr = sortType === 'ASC' ? quickSort(arr, sortType) : quickSort(arr, sortType).reverse();
      const cards = document.querySelectorAll('.card__wrapper') as NodeListOf<HTMLDivElement>;
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.order = `${sortedArr.findIndex(obj => Number(cards[i].style.order) === obj.order) + 1}`;
      }
    }
  }

  createSort() {
    const sort = <HTMLSelectElement>createCustomElement({selector : 'select', class : 'card__sort'});
    Object.values(types.CardSort).forEach((element, i) => {
      if (typeof element === 'string') {
        const option = <HTMLOptionElement>createCustomElement({selector : 'option', class : 'sort__option'});
        option.textContent = `${element}`.split('_').join(' ');
        option.value = `${element}`;
        if (i === 0) {
          option.textContent += ':';
          option.disabled = true;
          option.selected = true;
        }
        sort.appendChild(option);
      }
    });
    sort.addEventListener('change',this.sort);
    return sort;
  }

  createFind() {
    const found = <HTMLDivElement>createCustomElement({selector : 'div', class : 'card__stat'});
    const foundText = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'stat__text'});
    const foundCount = <HTMLSpanElement>createCustomElement({selector : 'span', class : 'stat__count'});
    foundText.textContent = 'Found: ';
    foundCount.textContent = `${Products.length}`;
    found.appendChild(foundText);
    found.appendChild(foundCount);
    return found;
  }

  createSearch() {
    const search = <HTMLInputElement>createCustomElement({selector : 'input', class : 'card__search'});
    search.type = 'search';
    search.placeholder = 'Search product';
    search.addEventListener('keyup', () => {
      const filter: string = search.value.toUpperCase();
      const cards = document.querySelectorAll('.card__wrapper') as NodeListOf<HTMLDivElement>;
      let count = 0;
      for (let i = 0; i < cards.length; i++) {
        const values = cards[i].querySelectorAll('.item__category-value') as NodeListOf<HTMLSpanElement>;
        let result = false;
        for (let j = 0; j < values.length; j++) {
          const value = values[j].textContent?.trim() as string;
          if (value.toUpperCase().indexOf(filter) != -1) {
            result = true;
            count += 1;
            break;
          }
        }
        if (result) {
          (cards[i] as HTMLDivElement).style.display = '';
        } else {
          (cards[i] as HTMLDivElement).style.display = 'none';
        }
      }
      (document.querySelector('.stat__count') as HTMLSpanElement).textContent = `${count}`;
    });
    return search;
  }

  createDisplay() {
    const displayArea = <HTMLDivElement>createCustomElement({selector : 'div', class : 'card__display-area'});
    const displaySmall = <HTMLDivElement>createCustomElement({selector : 'div', class : 'card__display'});
    const displayLarge = <HTMLDivElement>createCustomElement({selector : 'div', class : 'card__display'});
    for(let i=0; i < 16; i +=1 ) {
      const displayLargeDot = <HTMLDivElement>createCustomElement({selector : 'div', class : 'large__dot'});
      displayLargeDot.textContent = '.';
      displayLarge.appendChild(displayLargeDot);
    }
    for(let i=0; i < 36; i +=1 ) {
      const displaySmallDot = <HTMLDivElement>createCustomElement({selector : 'div', class : 'small__dot'});
      displaySmallDot.textContent = '.';
      displaySmall.appendChild(displaySmallDot);
    }
    displayLarge.classList.toggle('active');
    displayArea.addEventListener('click', (e) => {
      const target = (e.target as HTMLDivElement).parentElement;
      if (target && !target.classList.contains('active')){
        displayLarge.classList.toggle('active');
        displaySmall.classList.toggle('active');
        (document.querySelectorAll('.card__wrapper') as NodeListOf<HTMLDivElement>).forEach(
          (el) => {
            el.classList.toggle('display-small');
          }
        );
      }
    });
    displayArea.appendChild(displaySmall);
    displayArea.appendChild(displayLarge);
    return displayArea;
  }

  createCardFuncsArea() {
    const funcArea = <HTMLDivElement>createCustomElement({selector : 'div', class : 'product__funcs'});
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