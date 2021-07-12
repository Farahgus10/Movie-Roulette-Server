require('dotenv').config();
const { Pool } = require('pg');

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": process.env.DATABASE_URL,
  }