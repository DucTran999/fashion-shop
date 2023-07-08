import redis from "redis";
import * as dotenv from "dotenv";

dotenv.config();

const client = redis.createClient({
  url: process.env.REDIS_URI,
});

client.on("connect", () => console.log(">>> Redis ::: Connected"));
client.on("ready", () => console.log(">>> Redis ::: Ready"));
client.on("error", (err) => console.log("Redis Client Error", err));

process.on("SIGINT", async () => {
  console.log("Redis ::: Closed <<<");
  await client.quit();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Redis ::: Closed <<<");
  await client.quit();
  process.exit(0);
});

export default client;
