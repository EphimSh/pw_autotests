import { ID, IResponseFields } from "../core.type";
import { MANUFACTURERS } from "../../product/Manufacturers";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface ICreatedOn {
  createdOn: string;
}

export interface IProductInTable
  extends Pick<IProduct, "name" | "price" | "manufacturer">,
    ICreatedOn {}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}

export interface IProductFromResponse
  extends Required<IProduct>,
    ICreatedOn,
    ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}
export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}
