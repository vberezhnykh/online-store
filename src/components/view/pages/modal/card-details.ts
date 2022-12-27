import { createCustomElement } from "../../../../assets/misc/func";
import creditCardImgSrc from "../../../../assets/images/modal/credit-card.png";

export class CardDetails {
  _cardNumberValidation = false;
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
    cardNumberInput.type = "number";
    cardNumberInput.onkeyup = () => this.validateCardNumber(cardNumberInput);
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

    const ERROR_CLASSES = ["card-number", "valid", "cvv"];
    for (let i = 0; i < 3; i++) {
      const error = createCustomElement({
        selector: "div",
        class: `${ERROR_CLASSES[i]}__error`,
      });
      error.textContent = `${ERROR_CLASSES[i]} - error`;
      container.appendChild(error);
    }

    return container;
  }

  toggleErrorMessage(className: string, isValid: boolean) {
    const errorElement = document.querySelector(`.${className}__error`);
    if (errorElement)
      if (isValid) errorElement.classList.remove(`${className}__error--active`);
      else errorElement.classList.add(`${className}__error--active`);
  }

  validateCardNumber(input: HTMLInputElement) {
    this._cardNumberValidation = false;
    if (input.value.length > 16) input.value = input.value.slice(0, 16);
    if (input.value.length === 16) this._cardNumberValidation = true;
    console.log(this._cardNumberValidation);
    return this.toggleErrorMessage("card-number", this._cardNumberValidation);
  }
}
