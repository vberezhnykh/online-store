import { createCustomElement } from "../../../../../../assets/misc/func";
import * as types from "../../../../../../assets/misc/types";
import Products from "../../../../../../products";
import DetailsPage from "../../../details/detailsPage";
import "./productCards.scss";

class ProductCard {
  _detailsPage: DetailsPage;
  _productIndex?: number;
  _productsInCart: Array<types.IProductInfo> = [];
  constructor() {
    this._detailsPage = new DetailsPage();
  }
  createButtons() {
    const cardButtonsArea = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "item__buttons" })
    );
    const cardButtonAddToCart = <HTMLButtonElement>(
      createCustomElement({ selector: "button", class: "item__button add" })
    );
    const cardButtonDetails = <HTMLButtonElement>(
      createCustomElement({ selector: "button", class: "item__button details" })
    );
    cardButtonAddToCart.textContent = "Add to cart";
    cardButtonAddToCart.onclick = (event) => {
      this.addToCart(event);
    };
    cardButtonDetails.textContent = "Details";
    cardButtonDetails.onclick = (event) => {
      this.openDetails(event);
    };
    cardButtonsArea.appendChild(cardButtonAddToCart);
    cardButtonsArea.appendChild(cardButtonDetails);
    return cardButtonsArea;
  }

  private addToCart(event: MouseEvent) {
    const button = event.target;
    if (
      button instanceof HTMLButtonElement &&
      button.parentElement &&
      button.parentElement.previousSibling &&
      button.parentElement.previousSibling.firstChild &&
      button.parentElement.previousSibling.firstChild.firstChild &&
      button.parentElement.previousSibling.firstChild.firstChild instanceof
        HTMLSpanElement
    ) {
      const productCard = button.parentElement.parentElement;
      const productName =
        button.parentElement.previousSibling.firstChild.firstChild.innerHTML;
      const productCardInfo = Products.find(
        (product) => product.title === productName
      );

      if (!productCard?.classList.contains("card__item--in-cart")) {
        button.textContent = "Drop from cart";
        productCard?.classList.add("card__item--in-cart");
        if (productCardInfo && !this._productsInCart.includes(productCardInfo))
          this._productsInCart.push(productCardInfo);
      } else {
        button.textContent = "Add to cart";
        productCard.classList.remove("card__item--in-cart");
        if (productCardInfo) {
          this._productsInCart.splice(
            this._productsInCart.indexOf(productCardInfo),
            1
          );
        }
      }
    }
    const cartCounter = document.querySelector(".header__cart");
    if (cartCounter instanceof HTMLDivElement) {
      cartCounter.dataset.value = this._productsInCart.length.toString();
    }
  }

  private openDetails(event: MouseEvent) {
    if (
      event.target instanceof HTMLButtonElement &&
      event.target.parentElement &&
      event.target.parentElement.previousSibling &&
      event.target.parentElement.previousSibling.firstChild &&
      event.target.parentElement.previousSibling.firstChild.firstChild &&
      event.target.parentElement.previousSibling.firstChild
        .firstChild instanceof HTMLSpanElement
    ) {
      const productName =
        event.target.parentElement.previousSibling.firstChild.firstChild
          .innerHTML;
      this._productIndex = Products.findIndex(
        (product) => product.title === productName
      );
      const pageContainer = document.querySelector(".page__container");
      if (pageContainer) {
        pageContainer.innerHTML = "";
        this._detailsPage.draw(this._productIndex);
      }
    }
  }

  createCard(data: Omit<types.IProductInfo, "images">) {
    const cardWrapper = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "card__wrapper" })
    );
    cardWrapper.style.order = `${data.id}`;
    const card = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "card__item" })
    );
    const cardHeading = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "item__heading" })
    );
    const cardItemTitle = <HTMLSpanElement>createCustomElement({
      selector: "span",
      /* class: "item__category-value title", */
      class: "item__category-value",
    });
    cardItemTitle.textContent = data.title;
    cardHeading.appendChild(cardItemTitle);
    const cardItemDetailsWrapper = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "item__details-wrapper" })
    );
    const cardItemDetails = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "item__details" })
    );
    const cardInfo = Object.entries(data);
    for (const el of cardInfo) {
      if (Object.values(types.CardDetailsOrder).includes(el[0])) {
        const cardCategory = <HTMLParagraphElement>(
          createCustomElement({ selector: "p", class: "item__category" })
        );
        const cardCategoryValue = <HTMLSpanElement>createCustomElement({
          selector: "span",
          class: "item__category-value",
        });
        let category = el[0]
          .charAt(0)
          .toLocaleUpperCase()
          .concat(el[0].slice(1));
        let value = el[1];
        if (el[0] === "discountPercentage") {
          value = `${el[1]}%`;
          category = "Discount";
        }
        cardCategoryValue.textContent = `${value}`;
        cardCategory.textContent = `${category}: `;
        cardCategoryValue.classList.add(`${category}`);
        if (el[0] === "price") {
          cardCategory.textContent += "$";
        }
        cardCategory.appendChild(cardCategoryValue);
        cardCategory.style.order = `${Object.values(
          types.CardDetailsOrder
        ).indexOf(el[0])}`;
        cardItemDetails.appendChild(cardCategory);
      }
    }
    cardItemDetailsWrapper.appendChild(cardHeading);
    cardItemDetailsWrapper.appendChild(cardItemDetails);
    card.style.background = `url(${data.thumbnail}) 0% 0% / cover`;
    card.appendChild(cardItemDetailsWrapper);
    card.appendChild(this.createButtons());
    if (
      this._productsInCart.find(
        (product) => product.title === cardItemTitle.textContent
      )
    ) {
      card.classList.add("card__item--in-cart");
      if (card.lastElementChild && card.lastElementChild.firstElementChild) {
        card.lastElementChild.firstElementChild.textContent = "Drop from cart";
      }
    }
    cardWrapper.appendChild(card);
    return cardWrapper;
  }

  draw(options?: Array<types.IProductInfo>) {
    const container = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "product__cards" })
    );
    let products: Array<types.IProductInfo>;
    if (options) products = options;
    else products = Products;
    for (let i = 0; i < products.length; i += 1) {
      container.appendChild(this.createCard(products[i]));
    }
    if (options && options.length === 0) container.textContent = "Not found";
    (
      document.querySelector(".product__container") as HTMLDivElement
    ).appendChild(container);
  }
}

export default ProductCard;
