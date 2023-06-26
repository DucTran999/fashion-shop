import * as dotenv from "dotenv";
dotenv.config();

const DB_CONNECT_INFO = {
  pg: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    max: process.env.PG_MAX_CONNECTION,
  },
  mongoUrl: process.env.MONGO_URL,
};

export default DB_CONNECT_INFO;
