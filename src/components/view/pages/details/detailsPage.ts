import Nav from "./navBar/navBar";
import ProductDetails from "./productDetails/productDetails";
import { createCustomElement } from "../../../../assets/misc/func";
import './detailsPage.scss';

class DetailsPage {

  nav: Nav;
  details: ProductDetails;

  constructor() {
    this.nav= new Nav();
    this.details = new ProductDetails();
  }

  draw() {
    const container = <HTMLElement>createCustomElement({selector : 'section', class : 'details__container'});
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
    this.nav.draw();
    this.details.draw();
  }
}

export default DetailsPage;