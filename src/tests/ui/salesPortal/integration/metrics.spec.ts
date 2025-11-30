import numeral from "numeral";
import { metricsTestCases } from "consts/salesPortal/data/metric/metricCases";
import { generateMetricsResponseData } from "consts/salesPortal/data/metric/MetricsDataGenerator";
import { test, expect } from "fixtures";

const formatNumber = (value: number, format = "0.0a") =>
  `$${numeral(value).format(format)}`;

test.describe("[Integration] [Sales Portal] [Home Page] [Metrics Display]", () => {
  for (const caseData of metricsTestCases) {
    test(`${caseData.title}`, async ({ loginAsAdmin, homePage, mock }) => {
      const metricsData = generateMetricsResponseData(caseData.metricsData);

      await mock.metricsHomePage(metricsData);
      await loginAsAdmin();

      expect
        .soft(homePage.ordersThisYear)
        .toHaveText(caseData.metricsData.orders!.totalOrders.toString());
      expect
        .soft(homePage.newCustomers)
        .toHaveText(
          caseData.metricsData.customers!.totalNewCustomers.toString()
        );
      expect
        .soft(homePage.canceledOrders)
        .toHaveText(
          caseData.metricsData.orders!.totalCanceledOrders.toString()
        );
      expect
        .soft(homePage.totalRevenue)
        .toHaveText(
          formatNumber(caseData.metricsData.orders!.totalRevenue, "0.0a")
        );
      expect
        .soft(homePage.avgOrderValue)
        .toHaveText(
          formatNumber(caseData.metricsData.orders!.averageOrderValue, "0.0a")
        );
    });
  }
});
