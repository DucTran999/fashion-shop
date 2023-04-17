import pkg from "pg";
const { Pool } = pkg;
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  max: process.env.PGMAXCONNECTION,
});

export default pool;
