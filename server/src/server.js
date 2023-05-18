import createApp from "./app.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = createApp();

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
