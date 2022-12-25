import { Options } from "../../../../../../assets/misc/types";
import { List } from "../abstracts/abstracts";

class BrandList extends List {
  constructor() {
    super("brand", "brand");
  }
  updateBrandView(event: MouseEvent, options: Options) {
    if (event.target instanceof HTMLButtonElement) {
      this.resetStateToDefault();
      return;
    }
    this.updateFilterView(event);
    const inputs = document.querySelectorAll(".brand-list__input");
    const nonTargetInputs = document.querySelectorAll(".category-list__input");
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
          let matchedNumberOfProduct = options.brand[input.value];
          if (matchedNumberOfProduct === undefined) matchedNumberOfProduct = 0;
          input.parentElement.lastChild.textContent = `(${matchedNumberOfProduct}/${totalNumberOfProduct})`;
        }
      });
    }
    nonTargetInputs.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        if (Object.keys(options.category).includes(input.value)) {
          input.parentElement?.classList.remove(
            "category-list__item--inactive"
          );
        } else if (!input.checked) {
          input.parentElement?.classList.add("category-list__item--inactive");
          input.parentElement?.classList.remove("category-list__item--active");
        }
      }
    });
  }
}

export default BrandList;
