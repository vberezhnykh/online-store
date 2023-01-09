import { createCustomElement } from "../../../../assets/misc/func";
import {
  PersonalDetailsInputs,
  IPersonalDetails,
} from "../../../../assets/misc/types";

export class PersonalDetails implements IPersonalDetails {
  _isValidName = false;
  _isValidPhoneNumber = false;
  _isValidAddress = false;
  _isValidEmail = false;
  _isValid = false;
  toggleErrorMessage(
    input: HTMLInputElement,
    className: string,
    isValid: boolean
  ) {
    if (input.nextElementSibling)
      if (isValid)
        input.nextElementSibling.classList.remove(
          `${className}__error--active`
        );
      else
        input.nextElementSibling.classList.add(`${className}__error--active`);
  }

  createInput(className: string, placeholder: string, type: string) {
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
    input.type = type;
    if (className === "name") input.onkeyup = () => this.validateName(input);
    if (className === "number")
      input.onkeyup = () => this.validatePhoneNumber(input);
    if (className === "address")
      input.onkeyup = () => this.validateAddress(input);
    if (className === "email") input.onkeyup = () => this.validateEmail(input);
    const error = createCustomElement({
      selector: "div",
      class: `${className}__error`,
    });
    error.textContent = "ERROR";
    container.appendChild(error);
    return container;
  }

  createPersonalDetails() {
    const PERSONAL_DETAILS: PersonalDetailsInputs = {
      name: {
        type: "text",
        placeholder: "Name",
        min: "7",
      },
      number: {
        type: "tel",
        placeholder: "Phone number",
      },
      address: {
        type: "text",
        placeholder: "Delivery address",
      },
      email: {
        type: "email",
        placeholder: "E-mail",
      },
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
    personalDetails.append(
      this.createInput(
        "name",
        PERSONAL_DETAILS.name.placeholder,
        PERSONAL_DETAILS.name.type
      )
    );
    personalDetails.append(
      this.createInput(
        "number",
        PERSONAL_DETAILS.number.placeholder,
        PERSONAL_DETAILS.number.type
      )
    );
    personalDetails.append(
      this.createInput(
        "address",
        PERSONAL_DETAILS.address.placeholder,
        PERSONAL_DETAILS.address.type
      )
    );
    personalDetails.append(
      this.createInput(
        "email",
        PERSONAL_DETAILS.email.placeholder,
        PERSONAL_DETAILS.email.type
      )
    );
    return personalDetails;
  }

  validateName(input: HTMLInputElement) {
    this._isValidName = false;
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (regName.test(input.value) && input.value.length >= 7)
      this._isValidName = true;
    this.validatePersonalDetails();
    return this.toggleErrorMessage(input, "name", this._isValidName);
  }

  validatePhoneNumber(input: HTMLInputElement) {
    this._isValidPhoneNumber = false;
    if (input.value.length >= 1 && input.value[0] !== "+")
      input.value = `+${input.value}`;
    const regName = /^[+][0-9]*$/;
    if (regName.test(input.value) && input.value.length >= 9)
      this._isValidPhoneNumber = true;
    this.validatePersonalDetails();
    return this.toggleErrorMessage(input, "number", this._isValidPhoneNumber);
  }

  validateAddress(input: HTMLInputElement) {
    this._isValidAddress = false;
    const inputValue = input.value
      .trim()
      .split(" ")
      .filter((word) => word !== "" && word.length >= 5);
    if (inputValue.length >= 3) this._isValidAddress = true;
    this.validatePersonalDetails();
    return this.toggleErrorMessage(input, "address", this._isValidAddress);
  }
  validateEmail(input: HTMLInputElement) {
    this._isValidEmail = false;
    if (input.value.length > 0 && input.validity.valid)
      this._isValidEmail = true;
    this.validatePersonalDetails();
    return this.toggleErrorMessage(input, "email", this._isValidEmail);
  }
  validatePersonalDetails() {
    this._isValid = false;
    if (
      this._isValidName &&
      this._isValidPhoneNumber &&
      this._isValidAddress &&
      this._isValidEmail
    )
      this._isValid = true;
  }
}
