import pg from 'pg';
import dotenv from "dotenv"

dotenv.config();

const { Pool } = pg;

const db_uri:string = process.env.DATABASE_URL
console.log(db_uri)

const databaseConfig = {
  connectionString: db_uri,
  ssl: {
      rejectUnauthorized: false
  }
}

const connection = new Pool (databaseConfig);

export default connection;
