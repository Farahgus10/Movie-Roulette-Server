const express = require('express');
const MovieService = require('./movie-service');
const jsonParser = express.json;
const path = require('path');
const { serialize } = require('v8');
const movieRouter = express.Router();

// const serializeMovie = movie => ({
//     id: movie.id,
//     movie_name: xss(movie.title),
// })

movieRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db')

        MovieService.getMovies(db)
            .then(movie => {
                // res.status(200).json(movie.map(serializeMovie))
                res.status(200).json(movie)
            })
            .catch(next)

        MovieService.getDislikedMovies(db)
            .then(movie => {
                res.status(200).json(movie)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        const db = req.app.get('db')
        const { id, title, overview, genre_id, release_date } = req.body
        const newMovie = { id, title, overview, genre_id, release_date }

        //Error checking:
        if(!id) {
            return res.status(400).send('Movie ID required')
        }
        if(!title) {
            return res.status(400).send('Movie Title required')
        }

        MovieService.insertMovie(db, newMovie)
        .then(movie => {
            res.status(201).location(`/myMovies/${movie.id}`).json(movie)
        })
        .catch(next)

        MovieService.insertDislikedMovie(db, newMovie)
        .then(movie => {
            res.status(201).location(`/myMovies/${movie.id}`).json(movie)
        })
        .catch(next)

        console.log(newMovie)
    })

    // .post(jsonParser, (req, res, next) => {
    //     const db = req.app.get('db')
    //     const { movie_id, movie_title, movie_overview, genre_id, release_date } = req.body
    //     const newMovie = { movie_id, movie_title, movie_overview, genre_id, release_date }

    //     // todo: error checking 

    //     MovieService.insertMovie(db, newMovie)
    //         .then(movie => {
    //             res.status(201).location(path.posix.join(req.originalUrl, `/${movie.id}`)).json(serializeMovie(movie))
    //         })
    //         .catch(next)
    // })

movieRouter
    .route('/:movie_id')
    .delete((req, res, next) => {
        const db = req.app.get('db')
        
        MovieService.deleteMovie(db, req.params.movie_id)
            .then(res.status(203).send('Deleted'))
    })

    module.exports = movieRouter