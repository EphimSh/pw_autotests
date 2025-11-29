import { ID, IResponseFields } from "../core.type";

export enum USER_ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  roles: USER_ROLES[];
  createdOn: string;
}

export interface IUserDetails extends IUser, ID {}

export interface IUserFromResponse extends IResponseFields {
  User: IUserDetails;
}
