import {
  ICredentials,
  ILoginResponse,
} from "consts/salesPortal/data/types/credentials/Credential.type";
import { IApiClient } from "../apiClients/types";
import { IRequestOptions } from "consts/salesPortal/data/types/core.type";
import { apiConfig } from "config/apiConfig";

export class LoginApi {
  constructor(private apiClient: IApiClient) {}

  async login(credentials: Partial<ICredentials>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.login,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: credentials,
    };
    return await this.apiClient.send<ILoginResponse>(options);
  }
}
