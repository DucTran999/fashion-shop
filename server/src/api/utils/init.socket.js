import { Server } from "socket.io";
import {
  addOneSocketId,
  delOneSocketId,
  getUserSocketIds,
  delUserSocketIds,
} from "../v1/helpers/helper.socket.js";

let io;

const socketConnection = (server) => {
  io = new Server(server, { cors: "*" });

  io.on("connection", (socket) => {
    console.log(`Client connected`, socket.id);

    let userId = "";
    socket.on("user-login", async (clientUserId) => {
      userId = clientUserId;
      await addOneSocketId(socket.id, userId);
    });

    socket.on("user-logout", async (clientUserId) => {
      await delUserSocketIds(clientUserId);
    });

    socket.on("disconnect", async () => {
      await delOneSocketId(socket.id, userId);
      console.log(`Client disconnected`, socket.id);
    });
  });
};

const sendNotifications = async (userId, type) => {
  const socketIds = await getUserSocketIds(userId);

  // emit to all socket id consume by a user.
  if (socketIds) {
    for (let i = 0; i < socketIds.length; ++i) {
      io.to(socketIds[i]).emit(
        "new-notification",
        "You have new notification",
        { type: type }
      );
    }
  }
};

export { io, socketConnection, sendNotifications };
