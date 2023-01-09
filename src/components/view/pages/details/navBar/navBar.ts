import { createCustomElement } from "../../../../../assets/misc/func";
import * as types from "../../../../../assets/misc/types";
import Products from "../../../../../products";
import "./navBar.scss";

class NavBar {
  createNavItem(element?: string | number | string[]) {
    const listItem = <HTMLLIElement>(
      createCustomElement({ selector: "li", class: "list__item" })
    );
    const itemLink = <HTMLLinkElement>(
      createCustomElement({ selector: "a", class: "item__link" })
    );
    itemLink.textContent = element ? `${element}`.toUpperCase() : "STORE";
    listItem.appendChild(itemLink);
    return listItem;
  }
  createNavigation(productIndex: number) {
    const detailsNav = <HTMLElement>(
      createCustomElement({ selector: "nav", class: "details__nav" })
    );
    const navList = <HTMLUListElement>(
      createCustomElement({ selector: "ul", class: "nav__list" })
    );
    const det = Object.entries(Products[productIndex]);
    navList.appendChild(this.createNavItem());
    for (const el of det) {
      if (Object.values(types.DetailsNav).includes(el[0])) {
        navList.appendChild(this.createNavItem(el[1]));
      }
    }
    detailsNav.appendChild(navList);
    return detailsNav;
  }

  draw(productIndex = 0) {
    (document.querySelector(".page__details") as HTMLDivElement).appendChild(
      this.createNavigation(productIndex)
    );
  }
}

export default NavBar;
