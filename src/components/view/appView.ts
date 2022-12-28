import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";
import Filters from "./pages/main/filters/filters";
import Details from "./pages/details/detailsPage";
import Modal from "./pages/modal/modal";

class AppView {
  header: Header;
  footer: Footer;
  modal: Modal;
  page: Main;
  filters: Filters;
  // page: Details;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.modal = new Modal();
    this.page = new Main();
    this.filters = new Filters(this.page);
    // this.page = new Details();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    // this.modal.draw();
    this.page.draw();
    this.filters.draw();
  }
}

export default AppView;
