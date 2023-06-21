import notificationService from "./notification.service.js";

class NotificationController {
  getUserNotificationsReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;

      const [newsNotify, promotionsNotify, ordersNotify, hasUnread] =
        await notificationService.getUserNotifications(req, payload);

      res.status(200).json({
        status: "success",
        message: null,
        elements: {
          news: newsNotify,
          promotions: promotionsNotify,
          orders: ordersNotify,
          hasUnread: hasUnread,
        },
      });
    } catch (err) {
      next(err);
    }
  };

  changeNotificationMarkReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await notificationService.changeNotificationMark(req, payload);

      res.status(200).json({
        status: "success",
        message: null,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteNotificationReq = async (payload, req, res, next) => {
    try {
      if (payload instanceof Error) throw payload;
      await notificationService.deleteNotification(req, payload);

      res.status(200).json({
        status: "success",
        message: null,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new NotificationController();
