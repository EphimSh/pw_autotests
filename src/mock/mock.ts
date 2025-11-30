import { Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { STATUS_CODES } from "consts/salesPortal/data/statusCode";
import { IMetricsResponse } from "consts/salesPortal/data/types/metric.type";
import {
  IProductResponse,
  IProductsSortedResponse,
} from "consts/salesPortal/data/types/product/Product.type";

export class Mock {
  constructor(private page: Page) {}

  async productsPage(
    body: IProductsSortedResponse,
    statusCode: STATUS_CODES = STATUS_CODES.OK
  ) {
    this.page.route(/\/api\/products(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }

  async productDetailsModal(
    body: IProductResponse,
    statusCode: STATUS_CODES = STATUS_CODES.OK
  ) {
    await this.page.route(
      apiConfig.baseURL + apiConfig.endpoints.productById(body.Product._id),
      async (route) => {
        await route.fulfill({
          status: statusCode,
          contentType: "application/json",
          body: JSON.stringify(body),
        });
      }
    );
  }

  async metricsHomePage(
    body: IMetricsResponse,
    statusCode: STATUS_CODES = STATUS_CODES.OK
  ) {
    await this.page.route(/\/api\/metrics(\/)?(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }

  // Alias to match tests that call mock.metrics
  async metrics(
    body: IMetricsResponse,
    statusCode: STATUS_CODES = STATUS_CODES.OK
  ) {
    await this.metricsHomePage(body, statusCode);
  }
}
