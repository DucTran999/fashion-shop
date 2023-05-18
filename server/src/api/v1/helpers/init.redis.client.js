import redis from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const client = redis.createClient({
  url: process.env.REDIS_URI,
});

client.on("connect", () => console.log("Redis::: connected!"));

client.on("ready", () => console.log("Redis is ready!"));

client.on("error", (err) => console.log("Redis Client Error", err));

export default client;
