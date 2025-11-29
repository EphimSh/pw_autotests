import { apiConfig } from "config/apiConfig";
import { IRequestOptions } from "consts/salesPortal/data/types/core.type";
import {
  IProduct,
  IProductResponse,
  IProductsResponse,
} from "consts/salesPortal/data/types/product/Product.type";
import { IApiClient } from "../apiClients/types";

export class ProductsApi {
  constructor(private apiClient: IApiClient) {}

  async create(product: Partial<IProduct>, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.products,
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: product,
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  async delete(_id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(_id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<null>(options);
  }

  async getAll(token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productsAll,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClient.send<IProductsResponse>(options);
  }
}
