import * as dotenv from "dotenv";
dotenv.config();

const whitelist = [process.env.REACT_CLIENT];

const corsOptions = {
  // origin: (origin, callback) => {
  //   if (whitelist.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     console.log(origin);
  //     callback(new Error("Not allow by CORS"));
  //   }
  // },
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

export default corsOptions;
