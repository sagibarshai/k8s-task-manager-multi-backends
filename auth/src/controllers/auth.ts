import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/user";
import { validationResult } from "express-validator";
import { pgClient } from "../models/db";
import { compare, toHash } from "../utils/passwords";
import axios from "axios";

interface SignupRequest extends Request {
  body: Credentials;
}

interface Credentials {
  email: string;
  password: string;
}

interface LoginRequest extends Request {
  body: Credentials;
}
interface ResponseUser extends Omit<User, "password"> {}

export const signupController = async (req: SignupRequest, res: Response) => {
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
          Cookie: `token=${token}`,
        },
      }
    );

    const user: ResponseUser = { email, id };

    return res.status(201).json({ user });
  } catch (err) {
    console.log("Signup Route Error!! :", err);
    res.status(500).json({ message: "Something went wrong.." });
  }
};

export const loginController = async (req: LoginRequest, res: Response) => {
  //   step 1: check on database if the email is exist
  //   step 2:compare
  //   step 3: send token and user back to client

  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) return res.status(400).json({ message: "Credentials are not provided" });

  try {
    const existingUser = (await pgClient.query(`SELECT * FROM users WHERE email=$1`, [email])).rows[0] as User;
    if (!existingUser) return res.status(400).json({ message: "Wrong credentials" });
    console.log("existingUser ", existingUser);
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
};
