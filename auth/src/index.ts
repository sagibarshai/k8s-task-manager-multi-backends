import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { authRouter } from "./routes/auth";

if (!process.env.SALT) throw new Error("SALT env must be defined");
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env must be defined");
if (!process.env.PG_PORT) throw new Error("PG_PORT env must be defined");
if (!process.env.PGUSER) throw new Error("PGUSER env must be defined");
if (!process.env.PGDATABASE) throw new Error("PGDATABASE env must be defined");
if (!process.env.PGPASSWORD) throw new Error("PGPASSWORD env must be defined");
if (!process.env.PGHOST) throw new Error("PGHOST env must be defined");

const Port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use("/", authRouter);

app.listen(Port, () => {
  console.log(`Auth service run on port ${Port}`);
});
