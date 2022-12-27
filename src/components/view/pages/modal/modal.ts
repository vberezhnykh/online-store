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
    button.disabled = true;
    return button;
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
    modal.append(this.createConfirmButton());
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
