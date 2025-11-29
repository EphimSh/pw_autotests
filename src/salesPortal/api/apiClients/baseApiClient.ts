import {
  IRequestOptions,
  IResponse,
} from "consts/salesPortal/data/types/core.type";
import { IApiClient } from "./types";

export abstract class BaseApiClient implements IApiClient {
  abstract send<T extends object | null>(
    options: IRequestOptions
  ): Promise<IResponse<T>>;

  protected abstract transformResponse(): Promise<IResponse<object | null>>;
}
