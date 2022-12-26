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
  draw() {
    const modal = createCustomElement({ selector: "div", class: "modal" });
    modal.append(this._personalDetails.createPersonalDetails());
    modal.append(this._cardDetails.createCardDetails());
    document.body.prepend(modal);
  }
}

export default Modal;
