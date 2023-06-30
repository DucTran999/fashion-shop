import createHttpError from "http-errors";
import Joi from "joi";

const categoryScheme = Joi.object({
  category_name: Joi.string().trim().required(),
});

const validateAddCategoryPayload = (req, res, next) => {
  const { error } = categoryScheme.validate(req.body);
  if (error) {
    next(createHttpError.BadRequest());
  }
  next();
};

export default { validateAddCategoryPayload };
