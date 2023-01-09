import { createCustomElement } from "../../../../assets/misc/func";
import defaultCreditCardImgSrc from "../../../../assets/images/modal/default.png";
import visaImgSrc from "../../../../assets/images/modal/visa.png";
import masterCardImgSrc from "../../../../assets/images/modal/mastercard.png";
import mirImgSrc from "../../../../assets/images/modal/mir.png";
import { ICardDetails } from "../../../../assets/misc/types";

export class CardDetails implements ICardDetails {
  _isValidCardNumber = false;
  _isValidDate = false;
  _isValidCvv = false;
  _isValid = false;
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
    image.src = defaultCreditCardImgSrc;
    cardNumberContainer.append(image);
    const cardNumberInput = <HTMLInputElement>(
      createCustomElement({ selector: "input", class: "card-number__input" })
    );
    cardNumberInput.placeholder = "Card number";
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
    validInput.onkeyup = (event) => this.validateExpireDate(validInput, event);
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
    cvvInput.onkeyup = () => this.validateCvv(cvvInput);
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
    const ISSUER_IDENTIFICATION_NUMBERS = {
      visa: {
        from: 4,
        imgSrc: visaImgSrc,
        length: 16,
      },
      masterCard: {
        from: 2221,
        to: 2720,
        imgSrc: masterCardImgSrc,
        length: 16,
      },
      mir: {
        from: 2200,
        to: 2204,
        imgSrc: mirImgSrc,
        length: 16,
      },
    };
    const regEx = /[0-9]/;
    const cardImg = input.parentElement?.firstElementChild;
    const numberOfExtraWhiteSpaces = 3;
    let minLength = 16;
    this._isValidCardNumber = false;
    if (cardImg instanceof HTMLImageElement) {
      if (
        input.value[0] === ISSUER_IDENTIFICATION_NUMBERS.visa.from.toString()
      ) {
        cardImg.src = ISSUER_IDENTIFICATION_NUMBERS.visa.imgSrc;
        minLength = ISSUER_IDENTIFICATION_NUMBERS.visa.length;
      } else if (
        Number(input.value.slice(0, 4)) >=
          ISSUER_IDENTIFICATION_NUMBERS.masterCard.from &&
        Number(input.value.slice(0, 4)) <=
          ISSUER_IDENTIFICATION_NUMBERS.masterCard.to
      ) {
        cardImg.src = ISSUER_IDENTIFICATION_NUMBERS.masterCard.imgSrc;
        minLength = ISSUER_IDENTIFICATION_NUMBERS.masterCard.length;
      } else if (
        Number(input.value.slice(0, 4)) >=
          ISSUER_IDENTIFICATION_NUMBERS.mir.from &&
        Number(input.value.slice(0, 4)) <= ISSUER_IDENTIFICATION_NUMBERS.mir.to
      ) {
        cardImg.src = ISSUER_IDENTIFICATION_NUMBERS.mir.imgSrc;
        minLength = ISSUER_IDENTIFICATION_NUMBERS.mir.length;
      } else {
        cardImg.src = defaultCreditCardImgSrc;
        minLength = 16;
      }
    }

    if (!regEx.test(input.value[input.value.length - 1]))
      input.value = input.value.slice(0, input.value.length - 1);
    if (
      input.value.length === 5 ||
      input.value.length === 10 ||
      input.value.length === 15
    )
      input.value = `${input.value.slice(0, input.value.length - 1)} ${
        input.value[input.value.length - 1]
      }`;
    if (input.value.length > minLength + numberOfExtraWhiteSpaces)
      input.value = input.value.slice(0, minLength + numberOfExtraWhiteSpaces);
    if (input.value.length === minLength + numberOfExtraWhiteSpaces)
      this._isValidCardNumber = true;
    return this.toggleErrorMessage("card-number", this._isValidCardNumber);
  }

  validateExpireDate(input: HTMLInputElement, event: KeyboardEvent) {
    this._isValidDate = false;
    if (input.value.length > 5) input.value = input.value.slice(0, 5);
    const regEx = /[0-9]/;
    const expireMonth = input.value.slice(0, 2);
    const expireYear = input.value.slice(3);
    const MONTHS = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    if (!MONTHS.includes(expireMonth)) {
      this._isValidDate = false;
      return;
    }
    if (!regEx.test(input.value[input.value.length - 1]))
      input.value = input.value.slice(0, input.value.length - 1);
    if (input.value.length === 2 && event.key !== "Backspace") {
      input.value = `${input.value}/`;
    }
    if (input.value.length === 5) {
      const date: Date = new Date();
      const currentMonth = (date.getMonth() + 1).toString();
      const currentYear = date.getFullYear().toString().slice(2);
      if (expireYear < currentYear) return;
      if (
        expireYear === currentYear &&
        expireMonth < currentMonth.padStart(2, "0")
      )
        return;
      else {
        this._isValidDate = true;
      }
    }
    return this.toggleErrorMessage("valid", this._isValidDate);
  }

  validateCvv(input: HTMLInputElement) {
    this._isValidCvv = false;
    const regEx = /[0-9]/;
    if (!regEx.test(input.value[input.value.length - 1]))
      input.value = input.value.slice(0, input.value.length - 1);
    if (input.value.length > 3) input.value = input.value.slice(0, 3);
    if (input.value.length === 3) this._isValidCvv = true;
    return this.toggleErrorMessage("cvv", this._isValidCvv);
  }

  validateCardDetails() {
    this._isValid = false;
    if (this._isValidCardNumber && this._isValidDate && this._isValidCvv)
      this._isValid = true;
  }
}
