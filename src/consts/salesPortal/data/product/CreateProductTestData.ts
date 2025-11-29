import { faker } from "@faker-js/faker";
import { IProduct } from "../types/product/Product.type";
import { generateProductData } from "./ProductDataGenerator";
import { STATUS_CODES } from "../statusCode";

interface ICreateProductsCase {
  title: string;
  productData: Partial<IProduct>;
  expectedStatus: number;
  expectedMessage?: string | null;
  expectedIsSuccess?: boolean;
  useAuth?: boolean;
}

export const positive_CreateProductCases: ICreateProductsCase[] = [
  {
    title: "Create product with minimal valid name length",
    productData: generateProductData({
      name: faker.string.alphanumeric({ length: 3 }),
    }),
    expectedStatus: STATUS_CODES.CREATED,
    expectedMessage: null,
    expectedIsSuccess: true,
  },
  {
    title: "Create product with name containing single space and max length",
    productData: generateProductData({
      name: `${faker.string.alpha({ length: 19 })} ${faker.string.alpha({
        length: 20,
      })}`,
      notes: faker.string.alphanumeric({ length: 120 }),
    }),
    expectedStatus: STATUS_CODES.CREATED,
    expectedMessage: null,
    expectedIsSuccess: true,
  },
];

export const negative_CreateProductCases: ICreateProductsCase[] = [
  {
    title: "Should not create product with name shorter than 3 symbols",
    productData: generateProductData({
      name: faker.string.alphanumeric({ length: 2 }),
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product with name longer than 40 symbols",
    productData: generateProductData({
      name: faker.string.alphanumeric({ length: 41 }),
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product with non alphanumeric symbols in name",
    productData: generateProductData({
      name: "Invalid@Name#1",
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product when name has multiple spaces in a row",
    productData: generateProductData({
      name: "Bad  Name With  Spaces",
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product without name",
    productData: generateProductData({
      name: "",
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product without manufacturer",
    productData: generateProductData({
      manufacturer: "" as unknown as IProduct["manufacturer"],
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product with price below range",
    productData: generateProductData({
      price: 0,
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product with price above range",
    productData: generateProductData({
      price: 100000,
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product with amount below range",
    productData: generateProductData({
      amount: -1,
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product with amount above range",
    productData: generateProductData({
      amount: 1000,
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product with notes longer than 250 characters",
    productData: generateProductData({
      notes: faker.string.alphanumeric({ length: 251 }),
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
  {
    title: "Should not create product when notes contain prohibited symbols",
    productData: generateProductData({
      notes: "<script>alert('xss')</script>",
    }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedMessage: "Incorrect request body",
    expectedIsSuccess: false,
  },
];
