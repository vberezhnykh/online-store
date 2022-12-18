import { createCustomElement } from '../../../../assets/misc/func';
import { IProductInfo, CardDetailsOrder } from '../../../../assets/misc/interfaces';
import Products from '../../../../products';
import "./productCards.scss";

class ProductCard {

  createButtons() {
    const cardButtonsArea = <HTMLDivElement>createCustomElement({selector : 'div', class : `card__buttons`});
    const cardButtonAddToCart = <HTMLButtonElement>createCustomElement({selector : 'button', class : `card__button add`});
    const cardButtonDetails = <HTMLButtonElement>createCustomElement({selector : 'button', class : `card__button details`});
    cardButtonAddToCart.textContent = 'Add to cart';
    cardButtonDetails.textContent = 'Details';
    cardButtonsArea.appendChild(cardButtonAddToCart);
    cardButtonsArea.appendChild(cardButtonDetails);
    return cardButtonsArea;
  }

  createCard(data: Omit<IProductInfo, 'images' | 'id'>) {
    const card = <HTMLDivElement>createCustomElement({selector : 'div', class : `card__item`});
    const cardHeading = <HTMLDivElement>createCustomElement({selector : 'div', class : `item__heading`});
    const cardItemTitle = <HTMLSpanElement>createCustomElement({selector : 'span', class : `item__title`});
    cardItemTitle.textContent = data.title;
    cardHeading.appendChild(cardItemTitle);
    const cardItemDetails= <HTMLDivElement>createCustomElement({selector : 'div', class : `item__details`});
    const cardInfo = Object.entries(data);
    for(let el of cardInfo) {
      if (Object.values(CardDetailsOrder).includes(el[0])) {
        const cardInfoItem = <HTMLSpanElement>createCustomElement({selector : 'span', class : `item__${el[0]}`});
        let category = el[0].charAt(0).toLocaleUpperCase().concat(el[0].slice(1));
        let definition = el[1];
        if (el[0] === 'price') {
          definition = `$${el[1]}`;
        }
        if (el[0] === 'discountPercentage') {
          definition = `${el[1]}%`;
          category = 'Discount';
        }
        cardInfoItem.textContent = `${category}: ${definition}`;
        cardInfoItem.style.order = `${Object.values(CardDetailsOrder).indexOf(el[0])}`;
        cardItemDetails.appendChild(cardInfoItem);
      }
    }
    card.style.background = `url(${data.thumbnail})`;
    card.appendChild(cardHeading);
    card.appendChild(cardItemDetails);
    card.appendChild(this.createButtons());
    return card;
  }

  draw() {
    const container = <HTMLDivElement>createCustomElement({selector : 'section', class : 'card__container'});
    for(let i = 0; i < Products.length; i += 1) {
      container.appendChild(this.createCard(Products[i]));
    }
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
  }
}

export default ProductCard;