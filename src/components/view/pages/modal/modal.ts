import { createCustomElement } from "../../../../assets/misc/func";
import { PersonalDetails } from "./personal-details";
import { CardDetails } from "./card-details";

class Modal {
  _personalDetails: PersonalDetails;
  _cardDetails: CardDetails;
  constructor() {
    this._personalDetails = new PersonalDetails();
    this._cardDetails = new CardDetails();
  }
  createConfirmButton() {
    const button = <HTMLButtonElement>createCustomElement({
      selector: "button",
      class: "modal__confirm-button",
    });
    button.innerHTML = "CONFIRM";
    button.addEventListener("click", () => this.checkValidity());
    return button;
  }

  checkValidity() {
    this._personalDetails.validatePersonalDetails();
    this._cardDetails.validateCardDetails();
    if (this._personalDetails._isValid && this._cardDetails._isValid) {
      if (document.querySelector(".modal")) {
        (document.querySelector(".modal") as HTMLDivElement).innerHTML =
          "Thanks for your order. Soon you will be redirected to main page...";
        document.querySelector(".modal")?.classList.add("modal--ordered");
        const randomSec = Math.floor(Math.random() * (5000 - 3000 + 1) + 3000);
        setTimeout(() => {
          document.querySelector(".modal-overlay")?.remove();
        }, randomSec);
      }
    }
  }
  draw() {
    const overlay = createCustomElement({
      selector: "div",
      class: "modal-overlay",
    });
    document.body.prepend(overlay);
    const modal = createCustomElement({ selector: "div", class: "modal" });
    modal.append(this._personalDetails.createPersonalDetails());
    modal.append(this._cardDetails.createCardDetails());
    const confirmButton = this.createConfirmButton();
    modal.append(confirmButton);
    /* modal.addEventListener("keyup", () => {
      this._personalDetails.validatePersonalDetails();
      this._cardDetails.validateCardDetails();
    }); */
    overlay.append(modal);
    overlay.onclick = (event) => this.closeModal(event);
  }
  closeModal(event: Event) {
    if (
      event.target instanceof HTMLDivElement &&
      event.target.classList.contains("modal-overlay")
    )
      event.target.remove();
  }
}

export default Modal;
