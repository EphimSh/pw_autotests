import { ICustomer } from "./customers.type";
import { IDelivery } from "./delivery.type";
import { IProduct } from "./product/Product.type";

export interface IOrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: IRecentOrder[];
  ordersCountPerDay: IOrdersCountPerDay[];
}

export interface IRecentOrder {
  _id: string;
  status: string;
  customer: ICustomer;
  products: IProduct[];
  total_price: number;
  createdOn: string;
  delivery: IDelivery;
  comments: any[];
  history: any;
  assignedManager: any;
}

export interface IOrdersCountPerDay {
  date: IOrderDate;
  count: number;
}

export interface IOrderDate {
  day: number;
  month: number;
  year: number;
}
