enum ERROR_MESSAGE {
  NO_CREDS_PROVIDED = "Credentials are required",
  INVALID_CREDENTIALS = "Invalid credentials",
  PROVIDE_VALID_DATA = "Please, provide valid data",
  SHOULD_CONTAIN_EIGHT_CHARACTERS = "Password should contain at least 8 characters",
  PASSWORD_REQUIRED = "Password is required",
  USERNAME_REQUIRED = "Username is required",
  PREFIX_AND_POSTFIX_SPACES_NOT_ALLOWED = "Prefix and postfix spaces are not allowed is username",
  USER_NAME_IN_USE = "Username is in use",
}

enum SUCCESS_MESSAGE {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  LOGIN_SUCCESS = "Hello, ",
}

export { ERROR_MESSAGE, SUCCESS_MESSAGE };
