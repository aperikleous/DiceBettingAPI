import { Pool } from 'pg';

import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'gql-ts-sequelize',
  password: process.env.DB_PASS,
  port: 5432,
})