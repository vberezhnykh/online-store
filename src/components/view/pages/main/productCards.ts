import { createCustomElement } from '../../../../assets/misc/func';
import { IProductInfo } from '../../../../assets/misc/interfaces';
import Products from '../../../../products';
import "./productCards.scss";

class ProductCard {
  createCard(data: Omit<IProductInfo, 'images' | 'id'>) {
    const card = <HTMLDivElement>createCustomElement({selector : 'div', class : `card__item`});
    const cardHeading = <HTMLDivElement>createCustomElement({selector : 'div', class : `item__heading`});
    const cardItemTitle = <HTMLSpanElement>createCustomElement({selector : 'span', class : `item__title`});
    cardItemTitle.textContent = data.title;
    cardHeading.appendChild(cardItemTitle);
    const cardItemInfo = <HTMLDivElement>createCustomElement({selector : 'div', class : `item__info`});
    const cardInfo = Object.entries(data);
    for(let el of cardInfo) {
      if (el[0] !== 'images' && el[0] !== 'id') {
        const cardInfoItem = <HTMLSpanElement>createCustomElement({selector : 'span', class : `item__${el[0]}`});
        cardInfoItem.textContent = `${el[1]}`;
        cardItemInfo.appendChild(cardInfoItem);
      }
    }
    card.style.background = `url(${data.thumbnail})`;
    card.appendChild(cardHeading);
    card.appendChild(cardItemInfo);
    return card;
  }

  draw() {
    const container = <HTMLDivElement>createCustomElement({selector : 'section', class : 'card__container'});
    for(let i = 0; i < 4; i += 1) {
      container.appendChild(this.createCard(Products[i]));
    }
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
  }
}

export default ProductCard;