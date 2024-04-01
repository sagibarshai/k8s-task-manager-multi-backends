import { Request } from "express";

export interface PostTaskRequest extends Request {
  body: {
    title: string;
    content: string;
  };
}

export interface Task {
  user_id: string;
  id: string;
  timestamp: string;
  updated_at: string;
  title: string;
  content: string;
}
