export function createElement1(tag: string, tagClass: string) {
  let element = document.createElement(tag);
  element.classList.add(tagClass);
  console.log(1);
  return element;
}