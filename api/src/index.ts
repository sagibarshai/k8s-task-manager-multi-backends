import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pgClient } from "./db";
import "dotenv/config";
import { body, validationResult } from "express-validator";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import crypto from "crypto";
import cors from "cors";

const app = express();
const Port = 4002;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

interface User {
  email: string;
  id: string;
}

interface PostTaskRequest extends Request {
  body: {
    title: string;
    content: string;
  };
}

interface Note {
  user_id: string;
  id: string;
  timestamp: string;
  updated_at: string;
  title: string;
  content: string;
}

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env must be defined");
if (!process.env.PG_PORT) throw new Error("PG_PORT env must be defined");
if (!process.env.PGUSER) throw new Error("PGUSER env must be defined");
if (!process.env.PGDATABASE) throw new Error("PGDATABASE env must be defined");
if (!process.env.PGPASSWORD) throw new Error("PGPASSWORD env must be defined");
if (!process.env.PGHOST) throw new Error("PGHOST env must be defined");

pgClient.on("connect", (client) => {
  client.query(
    `CREATE TABLE IF NOT EXISTS tasks ( user_id VARCHAR, id VARCHAR, timestamp TIMESTAMP, updated_at TIMESTAMP, title VARCHAR, content VARCHAR )`
  );
});

// current user middleWare
const currentUserMiddleWear = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "unAuthorized Request" });

  let user: User | null = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as User;
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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ credentials: true }));

// Create new task
app.post(
  "/",
  currentUserMiddleWear,
  body("title").isLength({ min: 2 }).withMessage("Title must be valid"),
  body("content").isLength({ min: 2 }).withMessage("Content must be valid"),
  async (req: PostTaskRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

    const user = req.user!;
    const { content, title } = req.body;

    const id = crypto.randomUUID();

    try {
      await pgClient.query(`INSERT INTO tasks (user_id, id, timestamp, updated_at, title, content) VALUES ($1, $2, $3, $4, $5, $6)`, [
        user.id,
        id,
        new Date().toISOString(),
        new Date().toISOString(),
        title,
        content,
      ]);
      return res.status(201).json({ message: "ok" });
    } catch (err) {
      console.log("Error on create task route ", err);
      return res.status(500).json({ message: "Something went wrong.." });
    }
  }
);
//

// Read tasks
app.get("/", currentUserMiddleWear, async (req: Request, res: Response) => {
  const user = req.user!;
  try {
    const notes = (await pgClient.query(`SELECT * FROM tasks WHERE user_id=$1`, [user.id])).rows as Note[];
    return res.status(200).json({ notes });
  } catch (err) {
    console.log("Error on read task route ", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
});
//

// Update task
app.put(
  "/:id",
  currentUserMiddleWear,
  body("title").isLength({ min: 2 }).withMessage("Title must be valid"),
  body("content").isLength({ min: 2 }).withMessage("Content must be valid"),
  (req: PostTaskRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

    const { content, title } = req.body;
    const taskId = req.params.id;
    const user = req.user!;
    try {
      pgClient.query(`UPDATE tasks SET updated_at=$1, title=$2, content=$3 WHERE id=$4 AND user_id=$5`, [
        new Date().toISOString(),
        title,
        content,
        taskId,
        user.id,
      ]);
      res.status(200).json({ message: "ok" });
    } catch (err) {
      console.log("Error with delete task ", err);
      res.status(500).json({ message: "Something went wrong.." });
    }
  }
);
//

// Delete task
app.delete("/:id", currentUserMiddleWear, async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const user = req.user!;
  try {
    await pgClient.query(`DELETE FROM tasks WHERE id=$1 AND user_id=$2`, [taskId, user.id]);
    return res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log("Error with delete task ", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
});
//
app.listen(4002, () => {
  console.log(`Api server ron on ${Port} `);
});
