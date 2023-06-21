import createHttpError from "http-errors";
import Joi from "joi";

const notificationSchema = Joi.object({
  time: Joi.number().integer().options({ convert: false }).required(),
  id: Joi.string().trim().required(),
  type: Joi.string().trim().valid("news", "promotions", "order").required(),
  at: Joi.string().trim().required(),
  state: Joi.string().trim().pattern(new RegExp("^[0-9]+$")),
  total: Joi.number().integer().options({ convert: false }).required(),
  unread: Joi.required().valid(true, false),
});

const getNotificationParamsValidator = (req, res, next) => {
  try {
    // Checking params
    const userId = req.params.user_id;
    if (!userId) throw createHttpError.BadRequest();

    next();
  } catch (error) {
    next(error);
  }
};

const updateNotificationPayloadValidator = (req, res, next) => {
  try {
    // Checking params, query
    const userId = req.params.user_id;
    const notificationId = req.query.notification_id;

    if (!userId || !notificationId) throw createHttpError.BadRequest();
    // checking payload
    const { error } = notificationSchema.validate(req.body);
    if (error) throw createHttpError.BadRequest("Payload Invalid!");

    // checking timestamp
    if (+notificationId !== req.body.time) throw createHttpError.BadRequest();

    next();
  } catch (error) {
    next(error);
  }
};

const deleteNotificationPayloadValidator = (req, res, next) => {
  try {
    // Checking params
    const userId = req.params.user_id;
    const notificationId = req.params.notification_id;
    if (!userId || !notificationId) throw createHttpError.BadRequest();

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  getNotificationParamsValidator,
  updateNotificationPayloadValidator,
  deleteNotificationPayloadValidator,
};
