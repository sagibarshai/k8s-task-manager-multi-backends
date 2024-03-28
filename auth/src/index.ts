import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { body, validationResult } from "express-validator";
import axios from "axios";
import crypto from "crypto";

import { compare, toHash } from "./utils/passwords";
import { pgClient } from "./db";

interface Credentials {
  email: string;
  password: string;
}
interface SignupRequest extends Request {
  body: Credentials;
}
interface LoginRequest extends Request {
  body: Credentials;
}
interface User {
  email: string;
  password: string;
  id: string;
}
interface ResponseUser extends Omit<User, "password"> {}

if (!process.env.SALT) throw new Error("SALT env must be defined");
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET env must be defined");
if (!process.env.PG_PORT) throw new Error("PG_PORT env must be defined");
if (!process.env.PGUSER) throw new Error("PGUSER env must be defined");
if (!process.env.PGDATABASE) throw new Error("PGDATABASE env must be defined");
if (!process.env.PGPASSWORD) throw new Error("PGPASSWORD env must be defined");
if (!process.env.PGHOST) throw new Error("PGHOST env must be defined");

pgClient.on("connect", async (client) => {
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users (id VARCHAR ,email VARCHAR, password VARCHAR, token VARCHAR)`);
  } catch (err) {
    console.log("error with create new users table ", err);
  }
});

const Port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

// Health check
app.get("/", (_, res: Response) => res.status(200).json({ message: "ok" }));
//
// Signup
app.post(
  "/signup",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 6, max: 20 }).withMessage("Password must have 6 - 20 characters"),
  async (req: SignupRequest, res: Response) => {
    //   step 1: check if email is valid
    //   step 2: check on database if the email is not in use
    //   step 3: encrypt the password
    //   step 4: save on database encrypted password and email
    //   step 5: generate new token for to user
    //   step 6: send token and user back to client
    //   step 7: send email for client email

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) return res.status(400).json({ message: "Credentials are not provided" });

    try {
      const existingUser = (await pgClient.query(`SELECT * FROM users WHERE email=$1`, [email])).rows[0] as User;
      const encrypted = toHash(password);
      if (existingUser) return res.status(400).json({ message: "This email is in use" });

      const id = crypto.randomUUID();

      const token = jwt.sign({ id, email }, process.env.JWT_SECRET!);

      res.cookie("token", token, { httpOnly: true, maxAge: 3600000, secure: false });

      await pgClient.query(`INSERT INTO users (id ,email, password, token) VALUES ($1, $2, $3, $4)`, [id, email, encrypted, token]);

      await axios.post(
        "http://mail-service:4001/welcome",
        {},
        {
          withCredentials: true,
          headers: {
            Cookie: "token=" + token,
          },
        }
      );

      return res.status(201).json({ token, user: { email } });
    } catch (err) {
      console.log("Signup Route Error!! :", err);
      res.status(500).json({ message: "Something went wrong.." });
    }
  }
);
//

// Login
app.post("/login", async (req: LoginRequest, res: Response) => {
  //   step 1: check on database if the email is exist
  //   step 2:compare
  //   step 3: send token and user back to client

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) return res.status(400).json({ message: "Credentials are not provided" });

  try {
    const existingUser = (await pgClient.query(`SELECT * FROM users WHERE email=$1`, [email])).rows[0] as User;
    if (!existingUser) return res.status(400).json({ message: "Wrong credentials" });

    const isEqual = compare(password, existingUser.password);
    if (!isEqual) return res.status(400).json({ message: "Wrong credentials" });

    const token = jwt.sign({ id: existingUser.id, email }, process.env.JWT_SECRET!);

    await pgClient.query(`UPDATE users SET token=$1 WHERE email=$2`, [token, email]);

    const { password: _, ...clientUser } = existingUser;

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000, secure: false });
    res.status(200).json({ token, user: clientUser });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log("Login Route Error :", err);
  }
});
//

app.listen(Port, () => {
  console.log(`Auth service run on port ${Port}`);
});
