import { IResponseFields } from "./core.type";
import { ICustomersMetrics } from "./customers.type";
import { IOrdersMetrics } from "./orders.type";

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrdersMetrics;
  customers: ICustomersMetrics;
  products: IProductsMetrics;
}

export interface IProductsMetrics {
  topProducts: ITopProduct[];
}

export interface ITopProduct {
  name: string;
  sales: number;
}
