import { createCustomElement } from "../../../../assets/misc/func";
import { PersonalDetailsPlaceholders } from "../../../../assets/misc/types";

export class PersonalDetails {
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
}
