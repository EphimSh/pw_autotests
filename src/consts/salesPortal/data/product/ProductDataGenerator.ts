import { faker } from "@faker-js/faker";
import {
  IProduct,
  IProductFromResponse,
} from "../types/product/Product.type";
import { getRandomEnumValue } from "../../../../utils/Enum.utils";
import { MANUFACTURERS } from "./Manufacturers";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}

export function generateProductResponseData(
  params?: Partial<IProductFromResponse>
): IProductFromResponse {
  const base = generateProductData(params);

  return {
    ...base,
    _id: params?._id ?? faker.string.uuid(),
    createdOn: params?.createdOn ?? new Date().toISOString(),
    notes: params?.notes ?? base.notes ?? "",
    amount: params?.amount ?? base.amount,
  };
}
