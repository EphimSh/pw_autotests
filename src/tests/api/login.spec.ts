import {
  negativeLoginCases,
  positiveLoginCases,
} from "consts/salesPortal/data/login/LoginTestData";
import { expect, test } from "fixtures/api.fixture";

import { validateResponse } from "utils/validation/validateResponse.util";

test.describe("[API][Sales Portal] Login", () => {
  positiveLoginCases.forEach((caseData) => {
    test(`${caseData.title}`, async ({ loginApi }) => {
      const response = await loginApi.login(caseData.credentials);

      validateResponse(response, {
        status: caseData.expectedStatus,
        IsSuccess: caseData.expectedIsSuccess!,
        schema: caseData.schema!,
      });
      expect(response.headers["authorization"]).toBeTruthy();
    });
  });

  negativeLoginCases.forEach((caseData) => {
    test(`${caseData.title}`, async ({ loginApi }) => {
      const response = await loginApi.login(caseData.credentials);

      validateResponse(response, {
        status: caseData.expectedStatus,
        IsSuccess: caseData.expectedIsSuccess!,
        ErrorMessage: `${caseData.expectedErrorMessage}`,
        schema: caseData.schema!,
      });
      expect(response.headers).not.toContain("authorization");
    });
  });
});
