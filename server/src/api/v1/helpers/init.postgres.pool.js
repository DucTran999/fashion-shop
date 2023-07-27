import pkg from "pg";
import * as dotenv from "dotenv";

import DB_CONNECT_INFO from "../../../configs/database.config.js";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool(DB_CONNECT_INFO.pg);

pool.on("error", (err) => {
  console.log("!!! PG Pool ::: Error", err.code);
});

pool.addListener("pool-open", () => {
  console.log(">>> PG Pool ::: Connected");
});

const testConnectionOnBoost = async () => {
  try {
    await pool.query("select 1");
    pool.emit("pool-open");
  } catch (error) {
    pool.emit("error", error);
  }
};

testConnectionOnBoost();

// End pool when server down.
process.on("SIGINT", async () => {
  console.log("PG Pool ::: Closed <<<");
  await pool.end();
  process.exit(0);
});

export default pool;
