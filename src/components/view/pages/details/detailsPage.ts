import Nav from "./navBar/navBar";
import { createCustomElement } from "../../../../assets/misc/func";
import './detailsPage.scss';

class DetailsPage {

  nav: Nav;

  constructor() {
    this.nav= new Nav();
  }

  draw() {
    const container = <HTMLElement>createCustomElement({selector : 'section', class : 'details__container'});
    (document.querySelector('.page__container') as HTMLDivElement).appendChild(container);
    this.nav.draw();
  }
}

export default DetailsPage;