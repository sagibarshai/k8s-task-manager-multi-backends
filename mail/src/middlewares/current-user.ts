import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// current user middleWare
export const currentUserMiddleWear = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "unAuthorized Request" });

  let user: User | null = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as User;
  } catch (err) {
    if (!user) return res.status(401).json({ message: "unAuthorized Request" });
    console.log("Error with currentUserMiddleWear ", err);
    return res.status(500).json({ message: "Something went wrong.." });
  }
  req.user = user;
  next();
};
//
