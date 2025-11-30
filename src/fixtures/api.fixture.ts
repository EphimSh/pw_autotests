import { LoginApi } from "salesPortal/api/api/login.api";
import { ProductsApi } from "salesPortal/api/api/product.api";
import { LoginService } from "salesPortal/service/login.service";
import { ProductsApiService } from "salesPortal/service/products.service";
import { test as base, expect } from "@playwright/test";
import { RequestApi } from "salesPortal/api/apiClients/requestApi";

export interface IApi {
  // api
  productsApi: ProductsApi;
  loginApi: LoginApi;

  //services
  productsApiService: ProductsApiService;
  loginApiService: LoginService;
}

const test = base.extend<IApi>({
  //api
  productsApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new ProductsApi(apiClient);
    await use(api);
  },

  loginApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new LoginApi(apiClient);
    await use(api);
  },

  //services
  productsApiService: async ({ productsApi }, use) => {
    await use(new ProductsApiService(productsApi));
  },

  loginApiService: async ({ loginApi }, use) => {
    await use(new LoginService(loginApi));
  },
});

export { test, expect };
