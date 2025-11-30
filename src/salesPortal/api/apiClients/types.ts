import {
  IRequestOptions,
  IResponse,
} from "consts/salesPortal/data/types/core.type";

export interface IApiClient {
  send<T extends object | null>(
    options: IRequestOptions
  ): Promise<IResponse<T>>;
}
