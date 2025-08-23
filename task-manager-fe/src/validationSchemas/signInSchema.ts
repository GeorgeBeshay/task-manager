import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: true } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
