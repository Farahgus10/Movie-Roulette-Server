require('dotenv').config();

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": process.env.DATABASE_URL,
    // "host": process.env.MIGRATION_DB_HOST,
    // "database":  process.env.MIGRATION_DB_NAME,
    // "username": process.env.MIGRATION_DB_USER,
    "ssl": { 
      rejectUnauthorized: false 
    } 
  }