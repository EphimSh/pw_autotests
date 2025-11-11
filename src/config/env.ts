import { ICredentials } from "../../src/test-data/consts/salesPortal/data/credentials/Credential.type";

export const SALES_PORTAL_URL = process.env.SALES_PORTAL_URL!;
export const credentials: ICredentials = {
  username: process.env.USER_NAME!,
  password: process.env.USER_PASSWORD!,
};
