import { pgClient } from ".";

pgClient.on("connect", async (client) => {
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS welcome_mail (target VARCHAR, source VARCHAR, subject VARCHAR, content VARCHAR, success BOOLEAN, timestamp TIMESTAMP )`
    );
  } catch (err) {
    console.log("Error with create welcome_mail table ", err);
  }
});
