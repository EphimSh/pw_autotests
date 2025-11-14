import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "consts/salesPortal/data/schemas/login/login.schema";
import { USER_ROLES } from "consts/salesPortal/data/types/user/User.type";
import test, { expect } from "playwright/test";
import { validateJsonSchema } from "utils/validateJsonSchema.util";
import { validateResponse } from "utils/validateResponse.util";
const { baseURL, endpoints } = apiConfig;

test.describe("[API][Sales Portal] Login", () => {
  test("Response should have admin role when login with admin creds", async ({
    request,
  }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    validateResponse(loginResponse, {
      status: 200,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const body = await loginResponse.json();
    const headers = loginResponse.headers();
    expect.soft(headers["authorization"]).toBeTruthy();
    expect(body.User.roles).toContain(USER_ROLES.ADMIN);
  });
});
