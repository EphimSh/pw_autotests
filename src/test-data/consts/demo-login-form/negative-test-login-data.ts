import { ERROR_MESSAGE } from "../notifications/Notifications";

export interface ICredentials {
  username: string;
  password: string;
}

export interface INegativeCredentialsData extends ICredentials {
  message: string;
}
export const negative_login_data: INegativeCredentialsData[] = [
    {username: "", password: "testpassworD123", message: ERROR_MESSAGE.USERNAME_REQUIRED},
    {username: "testUsername123", password: "", message: ERROR_MESSAGE.PASSWORD_REQUIRED},
    {username: "", password: "", message: ERROR_MESSAGE.NO_CREDS_PROVIDED}
]
export const negative_register_credentials_data: INegativeCredentialsData[] = [
  {
    username: "Tes",
    password: "seven7",
    message: ERROR_MESSAGE.SHOULD_CONTAIN_EIGHT_CHARACTERS,
  },
  {
    username: "TestUserName",
    password: "",
    message: ERROR_MESSAGE.PASSWORD_REQUIRED,
  },
  {
    username: "TestUserName",
    password: "testpass",
    message: ERROR_MESSAGE.INVALID_CREDENTIALS,
  },
  {
    username: "TestUserName",
    password: "testpas",
    message: ERROR_MESSAGE.SHOULD_CONTAIN_EIGHT_CHARACTERS,
  },
  {
    username: "TestUserName",
    password: "        ",
    message: ERROR_MESSAGE.PASSWORD_REQUIRED,
  },
  {
    username: "TestUserName",
    password: "testpass ",
    message: ERROR_MESSAGE.PROVIDE_VALID_DATA,
  },
  {
    username: "TestUserName",
    password: " testpass ",
    message: ERROR_MESSAGE.PROVIDE_VALID_DATA,
  },
  {
    username: "TestUserName",
    password: " testpass",
    message: ERROR_MESSAGE.PROVIDE_VALID_DATA,
  },
  {
    username: "TestUserName",
    password: "testpassword",
    message: ERROR_MESSAGE.PROVIDE_VALID_DATA,
  },
  {
    username: "TestUserName",
    password: "t       d",
    message: ERROR_MESSAGE.PROVIDE_VALID_DATA,
  },
];
