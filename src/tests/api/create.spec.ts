import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import _ from "lodash";
import { generateProductData } from "consts/salesPortal/data/product/ProductDataGenerator";
import { createProductSchema } from "consts/salesPortal/data/schemas/product/create.schema";
import { STATUS_CODES } from "consts/salesPortal/data/statusCode";
import { validateResponse } from "utils/validateResponse.util";
import { loginSchema } from "consts/salesPortal/data/schemas/login/login.schema";
const { baseURL, endpoints } = apiConfig;

test.describe("[API][Sales Portal]", () => {
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

  test("Create product", async ({ request }) => {
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
    const createProductResponse = await request.post(
      baseURL + endpoints.products,
      {
        data: newProduct,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const createProductBody = await createProductResponse.json();
    validateResponse(createProductResponse, {
      status: 201,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const actualProductData = createProductBody.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(newProduct);

    id = actualProductData._id;
  });
});
