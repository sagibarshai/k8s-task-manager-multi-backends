import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import { welcomeMailRouter } from "./routes/welcome-mail";
import { currentUserMiddleWear } from "./middlewares/current-user";

const app = express();
const Port = 4001;
app.use(cookieParser());
app.use(cors({ credentials: true }));

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env must be defined");
if (!process.env.EMAIL_TOKEN) throw new Error("EMAIL_TOKEN env must be defined");
if (!process.env.PG_PORT) throw new Error("PG_PORT env must be defined");
if (!process.env.PGUSER) throw new Error("PGUSER env must be defined");
if (!process.env.PGDATABASE) throw new Error("PGDATABASE env must be defined");
if (!process.env.PGPASSWORD) throw new Error("PGPASSWORD env must be defined");
if (!process.env.PGHOST) throw new Error("PGHOST env must be defined");

app.post("/welcome", currentUserMiddleWear, welcomeMailRouter);

app.listen(Port, () => {
  console.log(`Mail service listen on ${Port}`);
});
