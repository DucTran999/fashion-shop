import createHttpError from "http-errors";
import notificationModel from "./notification.model.js";
import { NOTIFICATION_TYPE } from "../../utils/constVariable.js";
import { emitUserFetchNotifications } from "../helpers/helper.socket.js";

class NotificationService {
  pushOrderNotification = async (userId, message) => {
    const timestamp = Date.now();
    const owner = `notifications:user#${userId}`;

    const notification = {
      time: timestamp,
      ...message,
      unread: true,
    };

    await notificationModel.save(
      owner,
      timestamp,
      JSON.stringify(notification)
    );

    emitUserFetchNotifications(userId);
  };

  getUserNotifications = async (req, payload) => {
    // Check userId in token
    const userId = req.params.user_id;
    if (userId !== payload.user_id) throw createHttpError.BadRequest();

    // Fetch notification from redis
    const notifications = await notificationModel.findAllByUserId(userId);

    // Classify notification by type
    let hasUnread = false;
    const newsNotify = { all: [], unread: [], read: [] };
    const promotionsNotify = { all: [], unread: [], read: [] };
    const ordersNotify = { all: [], unread: [], read: [] };

    for (let notificationRaw of notifications) {
      const notification = JSON.parse(notificationRaw);

      // Order notifications are the majority so check first
      if (notification.type === NOTIFICATION_TYPE.orders) {
        ordersNotify.all.push(notification);
        notification.unread
          ? ordersNotify.unread.push(notification)
          : ordersNotify.read.push(notification);
      } else if (notification.type === NOTIFICATION_TYPE.promotions) {
        promotionsNotify.all.push(notification);
        notification.unread
          ? promotionsNotify.unread.push(notification)
          : promotionsNotify.read.push(notification);
      } else {
        newsNotify.all.push(notification);
        notification.unread
          ? newsNotify.unread.push(notification)
          : newsNotify.read.push(notification);
      }
    }

    hasUnread =
      ordersNotify.unread.length > 0 ||
      promotionsNotify.unread.length > 0 ||
      newsNotify.unread.length > 0;

    return [newsNotify, promotionsNotify, ordersNotify, hasUnread];
  };

  changeNotificationMark = async (req, payload) => {
    // Check userId in token
    const userId = req.params.user_id;
    if (userId !== payload.user_id) throw createHttpError.BadRequest();

    const timestamp = req.query.notification_id;
    const notification = req.body;

    const notificationInDB = await notificationModel.findOneByTimestamp(
      userId,
      timestamp
    );
    if (!notificationInDB.length) throw createHttpError.BadRequest();

    const owner = `notifications:user#${userId}`;

    await notificationModel.update(
      owner,
      timestamp,
      notificationInDB[0],
      JSON.stringify(notification)
    );
  };

  deleteNotification = async (req, payload) => {
    // Check userId in token
    const userId = req.params.user_id;
    if (userId !== payload.user_id) throw createHttpError.BadRequest();
    const notificationId = req.params.notification_id;

    const owner = `notifications:user#${userId}`;
    await notificationModel.delete(owner, notificationId);
  };
}

export default new NotificationService();
