require ('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const { v4: uuid } = require('uuid')
const winston = require('winston')
const MovieRouter = require('./Movies/movie-router')
const authRouter = require('./Auth/auth-router')
const usersRouter = require('./Users/users-router')
const profileRouter = require('./Profile/profile-router')

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

// set up winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'info.log' })
    ]
  });

if(NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

app.use(morgan(morganOption));
app.use(cors({
    origin: CLIENT_ORIGIN
}));
app.use(helmet())

app.use(express.json());

app.use('/myMovies', MovieRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        response = { message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app;