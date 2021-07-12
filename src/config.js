module.exports = {
    CLIENT_ORIGIN : process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || "development",
    // DB_URL: process.env.DB_URL || 'postgresql://movie_roulette_user@localhost/movie_roulette',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://movie_roulette_user@localhost/movie_roulette',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    }
}