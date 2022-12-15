export interface ICustomElement {
  selector: string;
  class: string;
  options?: IImgOptions;
}

interface IImgOptions {
  src : string; 
  alt : string;
}