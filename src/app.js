import express from "express";
import { config } from "dotenv";
config({
  path: ".env",
});
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

connectDB();

const allowlist = [
  "http://*.heroku.com",
  "https://*.heroku.com",
  process.env.CLIENT_URL,
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

const app = express();

app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.use("/api", routes);

export default app;
