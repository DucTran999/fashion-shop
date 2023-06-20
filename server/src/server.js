import http from "http";
import createApp from "./app.js";
import redisClient from "./api/v1/helpers/init.redis.client.js";

import * as dotenv from "dotenv";
dotenv.config();

redisClient.connect();

const PORT = process.env.PORT || 8080;
const app = createApp();
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
