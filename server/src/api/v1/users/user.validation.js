import createHttpError from "http-errors";
import Joi from "joi";

const userScheme = Joi.object({
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

const updateSchema = Joi.object({
  user_id: Joi.string().required(),
  first_name: Joi.string().trim().required(),
  last_name: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  gender: Joi.string().trim().required(),
  address: Joi.string().trim().allow(""),
  phone: Joi.string()
    .trim()
    .min(10)
    .max(11)
    .allow("")
    .pattern(new RegExp("^[0-9]+$")),
  date_of_birth: Joi.string().trim().allow(null),
});

const changePassSchema = Joi.object({
  old_password: Joi.string()
    .trim()
    .min(8)
    .max(32)
    .required()
    .pattern(new RegExp("^\\S+$")),
  new_password: Joi.string()
    .trim()
    .min(8)
    .max(32)
    .required()
    .pattern(new RegExp("^\\S+$")),
});

const validateSignUpPayload = (req, res, next) => {
  const { error } = userScheme.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest());
  }

  // Clean up payload
  const { first_name, last_name, email, password } = req.body;
  next({
    first_name: first_name.toLowerCase().trim(),
    last_name: last_name.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: password.trim(),
  });
};

const validateUpdatePayload = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    console.log(error);
    next(createHttpError.BadRequest("Invalid Info!"));
  }
  next();
};

const validateChangePasswordPayload = (req, res, next) => {
  const { error } = changePassSchema.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest("Invalid password!"));
  }

  next();
};

export default {
  validateSignUpPayload,
  validateUpdatePayload,
  validateChangePasswordPayload,
};
