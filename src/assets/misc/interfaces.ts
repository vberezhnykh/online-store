interface ICustomElement {
  selector: string;
  class: string;
  options?: IImgOptions;
}

interface IImgOptions {
  src: string;
  alt: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

export { ICustomElement, IImgOptions, Product };
