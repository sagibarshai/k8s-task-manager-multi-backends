import { Pool } from "pg";

export const pgClient = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: Number(process.env.PG_PORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: false,
});

pgClient.on("connect", (client) => {
  console.log("its run !!");
  client.query(
    `CREATE TABLE IF NOT EXISTS tasks (user_id VARCHAR, id VARCHAR, timestamp TIMESTAMP, updated_at TIMESTAMP, title VARCHAR, content VARCHAR )`
  );
});
