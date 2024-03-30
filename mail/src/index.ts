import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import "dotenv/config";
import nodemailer from "nodemailer";
import { pgClient } from "./db";
import cors from "cors";

interface User {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const app = express();
const Port = 4001;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env must be defined");
if (!process.env.EMAIL_TOKEN) throw new Error("EMAIL_TOKEN env must be defined");
if (!process.env.PG_PORT) throw new Error("PG_PORT env must be defined");
if (!process.env.PGUSER) throw new Error("PGUSER env must be defined");
if (!process.env.PGDATABASE) throw new Error("PGDATABASE env must be defined");
if (!process.env.PGPASSWORD) throw new Error("PGPASSWORD env must be defined");
if (!process.env.PGHOST) throw new Error("PGHOST env must be defined");
pgClient.on("connect", async (client) => {
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS welcome_mail (target VARCHAR, source VARCHAR, subject VARCHAR, content VARCHAR, success BOOLEAN, timestamp TIMESTAMP )`
    );
  } catch (err) {
    console.log("Error with create welcome_mail table ", err);
  }
});

// current user middleWare
const currentUserMiddleWear = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "unAuthorized Request" });

  let user: User | null = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as User;
    await pgClient.query(`
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
    );
`);

    const storedUserToken = (await pgClient.query("SELECT token FROM users WHERE email=$1", [user.email]))?.rows[0]?.token;
    if (storedUserToken !== token) return res.status(401).json({ message: "Something went wrong.." });
  } catch (err) {
    if (!user) return res.status(401).json({ message: "unAuthorized Request" });
    console.log("Error with currentUserMiddleWear ", err);
    return res.status(500).json({ message: "Something went wrong.." });
  }
  req.user = user;
  next();
};
//

app.get("/", (_, res: Response) => {
  return res.status(200).json({ message: "ok" });
});

app.post("/welcome", currentUserMiddleWear, async (req: Request, res: Response) => {
  const user = req.user!;

  const content = "Welcome to task manager app, We hope that you will enjoy here !";
  const source = "business.scheduler.app@gmail.com";
  const subject = "Welcome to task manager app";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: source,
      pass: process.env.EMAIL_TOKEN,
    },
  });

  try {
    await transporter.sendMail({
      from: source,
      to: user.email,
      subject,
      text: content,
      html: `<b>${content}</b>`,
    });
    await pgClient.query(`INSERT INTO welcome_mail (target, source, subject, content, success, timestamp) VALUES ($1, $2, $3, $4, $5, $6)`, [
      user.email,
      source,
      subject,
      content,
      "true",
      new Date().toISOString(),
    ]);

    return res.status(201).json({ message: "ok" });
  } catch (err) {
    await pgClient.query(`INSERT INTO welcome_mail (target, source, subject, content, success, timestamp) VALUES ($1, $2, $3, $4, $5, $6)`, [
      user.email,
      source,
      subject,
      content,
      "false",
      new Date().toISOString(),
    ]);
    console.log("Error from welcome route ", err);
    return res.status(500).json({ message: "Something went wrong..." });
  }
});

app.listen(Port, () => {
  console.log(`Mail service listen on ${Port}`);
});
