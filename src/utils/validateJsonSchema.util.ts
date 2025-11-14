import Ajv from "ajv";
import { expect } from "playwright/test";

export function validateJsonSchema(body: object, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  const isValid = validate(body);

  expect.soft(isValid).toBe(true);

  if (isValid) {
    console.log("According to the schema, received data is valid");
  } else {
    console.log("According to the schema, received data is not valid");
    console.log(validate.errors);
  }
}
