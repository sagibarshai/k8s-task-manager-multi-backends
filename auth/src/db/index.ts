import { Pool } from "pg";

export const pgClient = new Pool({
  port: Number(process.env.PG_PORT!),
  user: process.env.PGUSER!,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  ssl: false,
});
