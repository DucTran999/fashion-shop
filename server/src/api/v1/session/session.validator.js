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
  try {
    // Validate payload
    const { error } = userLoginScheme.validate(req.body);
    if (error) throw createHttpError.BadRequest();

    // Clean up payload
    const { email, password } = req.body;
    const emailCleaned = email.toLowerCase().trim();
    const passwordCleaned = password.trim();
    next({ email: emailCleaned, password: passwordCleaned });
  } catch (error) {
    next(error);
  }
};

export default {
  validateLoginPayload,
};
