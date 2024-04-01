import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { taskRouter } from "./routes/task";

const app = express();
const Port = 4002;

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env must be defined");
if (!process.env.PG_PORT) throw new Error("PG_PORT env must be defined");
if (!process.env.PGUSER) throw new Error("PGUSER env must be defined");
if (!process.env.PGDATABASE) throw new Error("PGDATABASE env must be defined");
if (!process.env.PGPASSWORD) throw new Error("PGPASSWORD env must be defined");
if (!process.env.PGHOST) throw new Error("PGHOST env must be defined");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ credentials: true }));

app.use("/", taskRouter);

app.listen(4002, () => {
  console.log(`Api server ron on ${Port} `);
});
