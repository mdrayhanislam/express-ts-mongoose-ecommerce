import dotenv from "dotenv";
import Path = require("path");

dotenv.config({ path: Path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
