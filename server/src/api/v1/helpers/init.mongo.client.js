import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const conn = mongoose.createConnection(process.env.MONGO_URL);

conn.on("connected", () => {
  console.log("MongoDB:::Connected");
});

conn.on("error", (error) => {
  console.error(JSON.stringify(error));
});

conn.on("disconnected", () => {
  console.log("MongoDB ::: close connection.");
});

process.on("SIGINT", async () => {
  await conn.close();
  process.exit(0);
});

export default conn;
