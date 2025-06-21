import Joi from "joi";
import { UserRoles } from "../users/user.enum";

export const registerValidationSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),

  last_name: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),

  user_role: Joi.string()
    .valid(...Object.values(UserRoles))
    .required()
    .messages({
      "any.only": `User role must be one of ${Object.values(UserRoles).join(", ")}`,
      "string.empty": "User role is required",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,])[A-Za-z\d@$!%*?&,]{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
      "string.empty": "Password is required",
    }),

  phone_number: Joi.string()
    .pattern(/^[+]?[\d\s()-]{7,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format",
      "string.empty": "Phone number is required",
    }),
});

// Login validation schema
export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "string.empty": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,])[A-Za-z\d@$!%*?&,]{8,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
      "string.empty": "Password is required",
    }),
});
