import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("DB connection error", error);
  }
};
