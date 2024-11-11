import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;
const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString,
});

export async function getUsers() {
  try {
    const queryResult = await pool.query("select * from myUser;");
    return queryResult.rows;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(
  username: string,
  password: string,
  secured: boolean
) {
  try {
    const queryResult = await pool.query(
      'insert into myuser (username, "password", secured) values ($1, $2, $3)',
      [username, password, secured]
    );
  } catch (error) {
    console.error(error);
  }
}
