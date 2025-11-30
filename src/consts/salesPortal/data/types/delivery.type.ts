export interface IDelivery {
  finalDate: string;
  condition: string;
  address: IAddress;
}

export interface IAddress {
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
}
