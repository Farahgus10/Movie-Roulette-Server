const express = require('express');
const MovieService = require('./movie-service');
const jsonParser = express.json;
const path = require('path');
const { serialize } = require('v8');
const movieRouter = express.Router();

const serializeMovie = movie => ({
    id: movie.id,
    movie_name: xss(movie.title),
})

movieRouter
    .route('/myMovies')
    .get((req, res, next) => {
        const db = req.app.get('db')

        MovieService.getMovies(db)
            .then(movie => {
                console.log(movie)
                res.status(200).json(movie.map(serializeMovie))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const db = req.app.get('db')
        const { movie_id, movie_title, movie_overview, genre_id, release_date } = req.body
        const newMovie = { movie_id, movie_title, movie_overview, genre_id, release_date }

        // todo: error checking 

        MovieService.insertMovie(db, newMovie)
            .then(movie => {
                res.status(201).location(path.posix.join(req.originalUrl, `/${movie.id}`)).json(serializeMovie(movie))
            })
            .catch(next)
    })
