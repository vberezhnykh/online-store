import { createCustomElement } from "../../../../assets/misc/func";
import creditCardImgSrc from "../../../../assets/images/modal/credit-card.png";

export class CardDetails {
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
}
