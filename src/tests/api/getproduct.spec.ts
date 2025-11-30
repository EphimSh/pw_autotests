import { test, expect } from "../../fixtures/api.fixture";
import { generateProductData } from "consts/salesPortal/data/product/ProductDataGenerator";
import { getAllProductsSchema } from "consts/salesPortal/data/schemas/product/getAll.schema";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.util";

test.describe("[API][Sales Portal] Get products", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Created product should be in get all products response", async ({
    loginApiService,
    productsApiService,
    productsApi,
  }) => {
    token = await loginApiService.getToken();
    const newProduct = generateProductData();

    const createdProductResponse = await productsApiService.create(
      token,
      newProduct
    );

    id = createdProductResponse._id;

    const getAllProducts = await productsApi.getAll(token);

    validateResponse(getAllProducts, {
      status: 200,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    expect(getAllProducts).toContainEqual(
      expect.objectContaining(_.omit(newProduct, ["_id", "createdOn"]))
    );
  });
});
