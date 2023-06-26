import * as dotenv from "dotenv";
dotenv.config();

const whitelist = [process.env.REACT_CLIENT_URI, process.env.REACT_ADMIN_URI];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allow by CORS"));
    }
  },
  method: ["POST", "PATCH", "GET", "DELETE"],
  credentials: true,
};

export default corsOptions;
