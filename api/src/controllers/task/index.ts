import { validationResult } from "express-validator";
import { PostTaskRequest, Task } from "../../routes/task/types";
import { Request, Response } from "express";
import { pgClient } from "../../models/db";
import crypto from "crypto";

export const createTaskController = async (req: PostTaskRequest, res: Response) => {
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
};

export const updateTaskController = (req: PostTaskRequest, res: Response) => {
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
    res.status(201).json({ message: "ok" });
  } catch (err) {
    console.log("Error with delete task ", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const getTaskController = async (req: Request, res: Response) => {
  const user = req.user!;
  try {
    const notes = (await pgClient.query(`SELECT * FROM tasks WHERE user_id=$1`, [user.id])).rows as Task[];
    return res.status(200).json({ notes });
  } catch (err) {
    console.log("Error on read task route ", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const user = req.user!;
  try {
    await pgClient.query(`DELETE FROM tasks WHERE id=$1 AND user_id=$2`, [taskId, user.id]);
    return res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log("Error with delete task ", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};
