import { Options } from "../../../../../../assets/misc/types";
import { List } from "../abstracts/core";

class CategoryList extends List {
  constructor() {
    super("category", "category");
  }
  updateCategoryView(event: MouseEvent, options: Options) {
    this.updateFilterView(event);
    const inputs = document.querySelectorAll(".category-list__input");
    const nonTargetInputs = document.querySelectorAll(".brand-list__input");
    // обновить количество найденных товаров
    if (event.target instanceof HTMLInputElement) {
      inputs.forEach((input) => {
        if (
          input instanceof HTMLInputElement &&
          input.parentElement &&
          input.parentElement.lastChild
        ) {
          const quantityOfProuct = input.parentElement.lastChild.textContent;
          const totalNumberOfProduct = quantityOfProuct
            ?.split("/")[1]
            .slice(0, -1);
          let matchedNumberOfProduct = options.category[input.value];
          if (matchedNumberOfProduct === undefined) matchedNumberOfProduct = 0;
          input.parentElement.lastChild.textContent = `(${matchedNumberOfProduct}/${totalNumberOfProduct})`;
        }
      });
    }
    nonTargetInputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        if (Object.keys(options.brand).includes(input.value)) {
          input.parentElement?.classList.remove("brand-list__item--inactive");
        } else if (!input.checked) {
          input.parentElement?.classList.add("brand-list__item--inactive");
          input.parentElement?.classList.remove("brand-list__item--active");
        }
      }
    });
  }
}

export default CategoryList;
