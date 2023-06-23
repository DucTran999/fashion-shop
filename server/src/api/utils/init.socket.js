import { Server } from "socket.io";
import {
  addOneSocketId,
  delOneSocketId,
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

export { io, socketConnection };
