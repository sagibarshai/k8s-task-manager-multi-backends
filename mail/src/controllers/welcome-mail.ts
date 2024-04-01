import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { pgClient } from "../models/db";

export const welcomeMailController = async (req: Request, res: Response) => {
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
};
