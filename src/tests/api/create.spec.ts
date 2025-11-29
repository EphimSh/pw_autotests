import { test, expect } from "fixtures/api.fixture";
import _ from "lodash";
import { generateProductData } from "consts/salesPortal/data/product/ProductDataGenerator";
import {
  positive_CreateProductCases,
  negative_CreateProductCases,
} from "consts/salesPortal/data/product/CreateProductTestData";
import { validateResponse } from "utils/validation/validateResponse.util";
import { credentials } from "config/env";

test.describe("[API][Sales Portal][Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApi }) => {
    if (id && token) await productsApi.delete(id, token);
    id = "";
    token = "";
  });

  positive_CreateProductCases.forEach((caseData) => {
    test(`${caseData.title}`, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.getToken(credentials);
      const productData = generateProductData(caseData.productData);
      const response = await productsApi.create(productData, token);

      validateResponse(response, {
        status: caseData.expectedStatus,
        schema: caseData.expectedSchema!,
        IsSuccess: caseData.expectedIsSuccess!,
        ErrorMessage: caseData.expectedMessage!,
      });

      id = response.body.Product._id;
      const actualProductData = response.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(
        productData
      );
    });
  });

  negative_CreateProductCases.forEach((caseData) => {
    test(`${caseData.title}`, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.getToken(credentials);
      const response = await productsApi.create(caseData.productData, token);
      console.log(response);
      validateResponse(response, {
        ErrorMessage: caseData.expectedMessage!,
        status: caseData.expectedStatus,
        schema: caseData.expectedSchema!,
      });
    });
  });
});
