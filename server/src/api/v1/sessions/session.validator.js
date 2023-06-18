import createHttpError from "http-errors";
import Joi from "joi";

const userLoginScheme = Joi.object({
  email: Joi.string()
    .email()
    .pattern(new RegExp("@gmail.com$"))
    .lowercase()
    .required(),
  password: Joi.string()
    .trim()
    .min(8)
    .max(32)
    .pattern(new RegExp("^\\S+$"))
    .required(),
});

const validateLoginPayload = (req, res, next) => {
  const { error } = userLoginScheme.validate(req.body);
  if (error) {
    next(createHttpError.Unauthorized());
  }
  // Clean up payload
  const { email, password } = req.body;
  const emailCleaned = email.toLowerCase().trim();
  const passwordCleaned = password.trim();

  next({ email: emailCleaned, password: passwordCleaned });
};

export default {
  validateLoginPayload,
};
