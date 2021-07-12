require('dotenv').config();

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
    // "connectionString": process.env.DATABASE_URL,
    // "ssl": { 
    //   rejectUnauthorized: false 
    // } 
  }