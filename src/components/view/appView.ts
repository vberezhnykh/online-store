import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./pages/main/mainPage";
import Details from "./pages/details/detailsPage";
import Modal from "./pages/modal/modal";

class AppView {
  header: Header;
  footer: Footer;
  //page: Main;
  // page: Details;
  modal: Modal;

  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    // this.page = new Details();
    this.modal = new Modal();
  }

  drawPage() {
    this.header.draw();
    this.footer.draw();
    // this.page.draw();
    this.modal.draw();
  }
}

export default AppView;
