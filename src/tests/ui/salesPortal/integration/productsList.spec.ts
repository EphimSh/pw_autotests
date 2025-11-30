import { apiConfig } from "config/apiConfig";
import { generateProductResponseData } from "consts/salesPortal/data/product/ProductDataGenerator";
import { SortOrder } from "consts/salesPortal/data/types/core.type";
import {
  ProductsSortField,
  ProductsTableHeader,
} from "consts/salesPortal/data/types/product/Product.type";
import { expect, test } from "fixtures";
import _ from "lodash";
import { convertToDateAndTime } from "utils/date.utils";

test.describe("[Integration] [Sales Portal] [Products] [Table Sorting]", () => {
  const directions = ["asc", "desc"] as SortOrder[];
  for (const header of [
    "Name",
    "Price",
    "Manufacturer",
    "Created On",
  ] as ProductsTableHeader[]) {
    for (const direction of directions) {
      test(`Field: ${header}, direction: ${direction}`, async ({
        loginAsAdmin,
        productsPage,
        mock,
      }) => {
        const headersMapper: Record<string, ProductsSortField> = {
          Name: "name",
          Price: "price",
          Manufacturer: "manufacturer",
          "Created On": "createdOn",
        };
        const product1 = generateProductResponseData();
        const product2 = generateProductResponseData();
        const products = [product1, product2];

        const sortByHeader = (items: typeof products, sortOrder: SortOrder) => {
          const sortField = headersMapper[header]!;
          return _.orderBy(
            items,
            [
              (p) =>
                sortField === "createdOn"
                  ? new Date(p.createdOn!).getTime()
                  : (p as any)[sortField],
            ],
            [sortOrder]
          );
        };

        await mock.productsPage({
          Products: sortByHeader(
            products,
            directions.find((el) => el !== direction)!
          ),
          IsSuccess: true,
          ErrorMessage: null,
          total: 1,
          page: 1,
          limit: 10,
          search: "",
          manufacturer: [],
          sorting: {
            sortField: headersMapper[header]!,
            sortOrder: directions.find((el) => el !== direction)!,
          },
        });

        await loginAsAdmin();
        await productsPage.open();
        await productsPage.waitForOpened();

        const sortedProducts = sortByHeader(products, direction);
        await mock.productsPage({
          Products: sortedProducts,
          IsSuccess: true,
          ErrorMessage: null,
          total: 1,
          page: 1,
          limit: 10,
          search: "",
          manufacturer: [],
          sorting: {
            sortField: headersMapper[header]!,
            sortOrder: direction,
          },
        });

        productsPage.clickTableHeader.bind(productsPage);

        const request = await productsPage.interceptRequest(
          apiConfig.endpoints.products,
          productsPage.clickTableHeader.bind(productsPage),
          header
        );

        await productsPage.waitForOpened();
        const requestUrl = new URL(request.url());
        expect(`${requestUrl.pathname}${requestUrl.search}`).toBe(
          `${apiConfig.endpoints.products}?sortField=${headersMapper[header]}&sortOrder=${direction}&page=1&limit=10`
        );

        await expect(
          productsPage.tableHeaderArrow(header, { direction })
        ).toBeVisible();

        const tableData = await productsPage.getTableData();
        expect(tableData.length).toBe(products.length);
        tableData.forEach((product, i) => {
          const expected = _.omit(sortedProducts[i], [
            "_id",
            "notes",
            "amount",
          ]);
          expected.createdOn = convertToDateAndTime(expected.createdOn!);
          expect(product).toEqual(expected);
        });
      });
    }
  }
});
