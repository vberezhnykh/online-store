import { createCustomElement } from "../../../../assets/misc/func";
import creditCardImgSrc from "../../../../assets/images/modal/credit-card.png";

interface PersonalDetailsPlaceholders {
  name: string;
  number: string;
  address: string;
  email: string;
}

class Modal {
  showErrorMessage(event: Event, className: string) {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.nextElementSibling
    )
      event.target.nextElementSibling.classList.toggle(
        `${className}__error--active`
      );
  }

  createInput(className: string, placeholder: string) {
    const container = createCustomElement({
      selector: "div",
      class: `${className}-container`,
    });
    const input = <HTMLInputElement>createCustomElement({
      selector: "input",
      class: `${className}__input`,
    });
    container.appendChild(input);
    input.placeholder = placeholder;
    // input.onclick = (event) => this.showErrorMessage(event, className);
    const error = createCustomElement({
      selector: "div",
      class: `${className}__error`,
    });
    error.textContent = "ERROR";
    container.appendChild(error);
    return container;
  }

  createPersonalDetails() {
    const PLACEHOLDERS: PersonalDetailsPlaceholders = {
      name: "Name",
      number: "Phone number",
      address: "Delivery address",
      email: "E-mail",
    };
    const personalDetails = createCustomElement({
      selector: "div",
      class: "personal-details",
    });
    const heading = createCustomElement({
      selector: "h2",
      class: "personal-details__heading",
    });
    heading.textContent = "Personal details";
    personalDetails.append(heading);
    personalDetails.append(this.createInput("name", PLACEHOLDERS.name));
    personalDetails.append(this.createInput("number", PLACEHOLDERS.number));
    personalDetails.append(this.createInput("address", PLACEHOLDERS.address));
    personalDetails.append(this.createInput("email", PLACEHOLDERS.email));
    return personalDetails;
  }

  createCardDetails() {
    const container = createCustomElement({
      selector: "div",
      class: "card-details",
    });
    const heading = createCustomElement({
      selector: "h2",
      class: "personal-details__heading",
    });
    heading.textContent = "Credit card details";
    container.append(heading);

    const cardData = createCustomElement({
      selector: "div",
      class: "card-data",
    });

    const cardNumberContainer = createCustomElement({
      selector: "div",
      class: "card-number",
    });
    const image = new Image();
    image.src = creditCardImgSrc;
    cardNumberContainer.append(image);
    const cardNumberInput = <HTMLInputElement>(
      createCustomElement({ selector: "input", class: "card-number__input" })
    );
    cardNumberInput.placeholder = "Card number";
    cardNumberContainer.append(cardNumberInput);
    cardData.append(cardNumberContainer);

    const otherCardData = createCustomElement({
      selector: "div",
      class: "other-card-data",
    });
    const validContainer = createCustomElement({
      selector: "div",
      class: "valid-container",
    });
    const validInput = <HTMLInputElement>(
      createCustomElement({ selector: "input", class: "valid__input" })
    );
    validInput.placeholder = "Valid Thru";
    validContainer.append(validInput);
    otherCardData.append(validContainer);

    const cvvContainer = createCustomElement({
      selector: "div",
      class: "cvv-container",
    });
    const cvvInput = <HTMLInputElement>(
      createCustomElement({ selector: "input", class: "cvv__input" })
    );
    cvvInput.placeholder = "Code";
    cvvContainer.append(cvvInput);
    otherCardData.append(cvvContainer);
    cardData.append(otherCardData);

    container.append(cardData);
    return container;
  }

  draw() {
    const modal = createCustomElement({ selector: "div", class: "modal" });
    modal.append(this.createPersonalDetails());
    modal.append(this.createCardDetails());
    document.body.prepend(modal);
  }
}

export default Modal;
