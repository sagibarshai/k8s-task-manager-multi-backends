import { Pool } from "pg";

export const pgClient = new Pool({
  port: Number(process.env.PG_PORT!),
  user: process.env.PGUSER!,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  ssl: false,
});

pgClient.on("connect", async (client) => {
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users (id VARCHAR ,email VARCHAR, password VARCHAR, token VARCHAR)`);
  } catch (err) {
    console.log("error with create new users table ", err);
  }
});
