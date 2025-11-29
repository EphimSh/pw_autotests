import { expect } from "@playwright/test";
import { credentials } from "config/env";
import { loginSchema } from "consts/salesPortal/data/schemas/login/login.schema";
import { STATUS_CODES } from "consts/salesPortal/data/statusCode";
import { IResponse } from "consts/salesPortal/data/types/core.type";
import { ICredentials } from "consts/salesPortal/data/types/credentials/Credential.type";
import { LoginApi } from "salesPortal/api/api/login.api";
import { validateJsonSchema } from "utils/validation/validateJsonSchema.util";
import { validateResponse } from "utils/validation/validateResponse.util";

export class LoginService {
  constructor(private loginApi: LoginApi) {}
  async loginAsAdmin(customCredentials?: Partial<ICredentials>) {
    const response = await this.loginApi.login(
      customCredentials ?? credentials
    );
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });

    validateJsonSchema(response.body, loginSchema);

    const headers = response.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    return response;
  }

  async getToken(customCredentials?: Partial<ICredentials>) {
    const response = await this.loginApi.login(
      customCredentials ?? credentials
    );
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const headers = response.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    return token;
  }
}
