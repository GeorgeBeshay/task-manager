import Joi from "joi";

export const signupSchema = Joi.object({
  fullName: Joi.string().min(6).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 6 characters",
    "string.max": "Full name must be at most 50 characters",
  }),
  email: Joi.string().email({ tlds: { allow: true } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.pattern.base": "Password must include at least one letter, one number, and one special character",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});
