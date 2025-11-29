import { credentials } from "config/env";
import { STATUS_CODES } from "../statusCode";
import { ICredentials } from "../types/credentials/Credential.type";
import { loginSchema, loginErrorSchema } from "../schemas/login/login.schema";

interface ILoginCase {
  title: string;
  credentials: Partial<ICredentials>;
  expectedStatus: number;
  schema?: object;
  expectToken?: boolean;
  expectedIsSuccess?: boolean;
  expectedErrorMessage?: string | null;
}

export const positiveLoginCases: ILoginCase[] = [
  {
    title: "Login with valid credentials should return token",
    credentials,
    expectedStatus: STATUS_CODES.OK,
    schema: loginSchema,
    expectedErrorMessage: null,
  },
];

export const negativeLoginCases: ILoginCase[] = [
  {
    title: "Wrong password should be unauthorized",
    credentials: { username: credentials.username, password: "wrong_password" },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    schema: loginErrorSchema,
    expectedIsSuccess: false,
    expectedErrorMessage: "Incorrect credentials",
  },
  {
    title: "Unknown username should be unauthorized",
    credentials: { username: "unknown_user", password: credentials.password },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    schema: loginErrorSchema,
    expectedIsSuccess: false,
    expectedErrorMessage: "Incorrect credentials",
  },
  {
    title: "Empty username should be bad request",
    credentials: { username: "", password: credentials.password },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    schema: loginErrorSchema,
    expectedIsSuccess: false,
    expectedErrorMessage: "Incorrect credentials",
  },
  {
    title: "Empty password should be bad request",
    credentials: { username: credentials.username, password: "" },
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    schema: loginErrorSchema,
    expectedIsSuccess: false,
    expectedErrorMessage: "Incorrect credentials",
  },
];
