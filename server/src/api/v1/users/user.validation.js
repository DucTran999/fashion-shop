import createHttpError from "http-errors";
import Joi from "joi";

const normalUserScheme = Joi.object({
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
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

const validateSignUpPayload = (req, res, next) => {
  const { error } = normalUserScheme.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest());
  }
  next();
};

const validateLoginPayload = (req, res, next) => {
  const { error } = userLoginScheme.validate(req.body);
  if (error) {
    next(createHttpError.Unauthorized());
  }
  next();
};

export default { validateLoginPayload, validateSignUpPayload };
