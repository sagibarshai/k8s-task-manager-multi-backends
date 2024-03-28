import { Pool } from "pg";

export const pgClient = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: Number(process.env.PG_PORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: false,
});
