import { createCustomElement } from "../../../../assets/misc/func";
import { PersonalDetailsInputs } from "../../../../assets/misc/types";

export class PersonalDetails {
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
    let isValid = false;
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (regName.test(input.value) && input.value.length >= 7) isValid = true;
    return this.toggleErrorMessage(input, "name", isValid);
  }
}
