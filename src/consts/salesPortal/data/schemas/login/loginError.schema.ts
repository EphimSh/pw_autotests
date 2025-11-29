import {
  obligatoryFieldsSchema,
  obligatoryRequiredFields,
} from "../core.schema";

export const loginErrorSchema = {
  type: "object",
  properties: {
    IsSuccess: { ...obligatoryFieldsSchema.IsSuccess, enum: [false] },
    ErrorMessage: {
      ...obligatoryFieldsSchema.ErrorMessage,
      enum: ["Incorrect credentials"],
    },
  },
  required: [...obligatoryRequiredFields],
};
