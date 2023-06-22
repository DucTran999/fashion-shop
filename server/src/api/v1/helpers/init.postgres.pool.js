import pkg from "pg";
import * as dotenv from "dotenv";

import DB_CONNECT_INFO from "../../../configs/database.config.js";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool(DB_CONNECT_INFO.pg);

// End pool when server down.
process.on("SIGINT", async () => {
  console.log("Postgres Pool ::: End <<<");
  await pool.end();
  process.exit(0);
});

export default pool;
