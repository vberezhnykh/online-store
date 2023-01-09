import { createCustomElement } from "../../../assets/misc/func";
import cartImg from "../../../assets/images/header/cart.svg";
import bagImg from "../../../assets/images/header/bag.svg";
import MainPage from "../pages/main/mainPage";
import Filters from "../pages/main/filters/filters";

class Header {
  _pageMain: MainPage;
  _filters: Filters;
  constructor(pageMain: MainPage, filters: Filters) {
    this._pageMain = pageMain;
    this._filters = filters;
  }
  createLogoCart(type: string) {
    const parent = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: `header__${type}` })
    );
    const link = <HTMLLinkElement>(
      createCustomElement({ selector: "a", class: `${type}__link link` })
    );
    const imgUrl: string = type === "cart" ? cartImg : bagImg;
    const linkImg = <HTMLImageElement>createCustomElement({
      selector: "img",
      class: `${type}__image`,
      options: { src: imgUrl, alt: `${type}Image` },
    });
    link.setAttribute("href", "#");
    link.appendChild(linkImg);
    if (type === "cart") {
      parent.setAttribute("data-value", "0");
    } else {
      link.innerHTML += "Online store";
    }

    parent.appendChild(link);
    return parent;
  }
  createTotalSum(): HTMLDivElement {
    const headerTotal = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "header__total" })
    );
    const totalText = <HTMLSpanElement>(
      createCustomElement({ selector: "span", class: "total__text" })
    );
    const totalSum = <HTMLSpanElement>(
      createCustomElement({ selector: "span", class: "total__sum" })
    );
    totalText.textContent = "Total: $";
    totalSum.textContent = "0.00";
    headerTotal.appendChild(totalText);
    headerTotal.appendChild(totalSum);
    return headerTotal;
  }
  draw() {
    const container = <HTMLDivElement>(
      createCustomElement({ selector: "div", class: "header__container" })
    );
    container.appendChild(this.createLogoCart("logo"));
    container.appendChild(this.createTotalSum());
    container.appendChild(this.createLogoCart("cart"));
    (document.querySelector(".header") as HTMLDivElement).appendChild(
      container
    );
    container.addEventListener("click", (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.classList.contains("logo__image")
      ) {
        this.backToHomePage();
      }
    });
  }

  backToHomePage() {
    const pageContainer = document.querySelector(".page__container");
    if (pageContainer) {
      pageContainer.innerHTML = "";
      this._pageMain.draw();
      pageContainer.prepend(this._filters._element);
      (
        document.querySelector(
          ".filters-buttons-container__reset-button"
        ) as HTMLButtonElement
      ).click();
    }
  }
}

export default Header;
