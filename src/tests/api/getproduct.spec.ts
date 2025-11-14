import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "consts/salesPortal/data/product/ProductDataGenerator";
import { loginSchema } from "consts/salesPortal/data/schemas/login/login.schema";
import { createProductSchema } from "consts/salesPortal/data/schemas/product/create.schema";
import { getAllProductsSchema } from "consts/salesPortal/data/schemas/product/getAll.schema";
import { STATUS_CODES } from "consts/salesPortal/data/statusCode";
import _ from "lodash";
import test, { expect } from "playwright/test";
import { validateResponse } from "utils/validateResponse.util";
const { baseURL, endpoints } = apiConfig;
test.describe("[API][Sales Portal] Get products", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ request }) => {
    const response = await request.delete(
      `${baseURL}${endpoints.products}/${id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });

  test("Created product should be in get all products response", async ({
    request,
  }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    validateResponse(loginResponse, {
      status: 200,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const headers = loginResponse.headers();
    token = headers["authorization"]!;
    expect.soft(token).toBeTruthy();

    const newProduct = generateProductData();
    const createdProductResponse = await request.post(
      baseURL + endpoints.products,
      {
        data: newProduct,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    validateResponse(createdProductResponse, {
      status: 201,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const createdProductBody = await createdProductResponse.json();
    const actualProductData = createdProductBody.Product;
    id = actualProductData._id;

    const getAllProducts = await request.get(baseURL + endpoints.productsAll, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const getAllProductsBody = await getAllProducts.json();

    validateResponse(getAllProducts, {
      status: 200,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    expect(getAllProductsBody.Products).toContainEqual(
      expect.objectContaining(_.omit(actualProductData, ["_id", "createdOn"]))
    );
  });
});
