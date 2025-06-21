import Joi from "joi";

export const updateUserSchema = Joi.object({
  first_name: Joi.string().optional().messages({
    "string.base": "First name must be a string",
  }),
  last_name: Joi.string().optional().messages({
    "string.base": "Last name must be a string",
  }),
  phone_number: Joi.string()
    .pattern(/^[+]?[\d\s()-]{7,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid phone number format",
    }),
});
