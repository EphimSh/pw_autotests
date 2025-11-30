import { ProductsApi } from "../api/api/product.api";
import { IProduct } from "../../consts/salesPortal/data/types/product/Product.type";
import { generateProductData } from "consts/salesPortal/data/product/ProductDataGenerator";
import { STATUS_CODES } from "consts/salesPortal/data/statusCode";
import { createProductSchema } from "consts/salesPortal/data/schemas/product/create.schema";
import { validateResponse } from "../../utils/validation/validateResponse.util";

export class ProductsApiService {
  constructor(private productsApi: ProductsApi) {}

  async create(token: string, product: IProduct) {
    const data = generateProductData(product);
    const response = await this.productsApi.create(data, token);
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
    });
    return response.body.Product;
  }

  async delete(token: string, id: string) {
    const response = await this.productsApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}
