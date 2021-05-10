const express = require('express');
const path = require('path');
const { requireAuth } = require('../Middleware/jwt-auth')
const MovieService = require('./movie-service');
const { serialize } = require('v8');
const app = require('../app');

const movieRouter = express.Router();
const jsonParser = express.json();

// const serializeMovie = movie => ({
//     id: movie.id,
//     movie_name: xss(movie.title),
// })

movieRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        const db = req.app.get('db')

        MovieService.getMovies(db, String(req.user.id))
            .then(movie => {
                // res.status(200).json(movie.map(serializeMovie))
                res.status(200).json(movie)
            })
            .catch(next)
    })
    .post(requireAuth, (req, res, next) => {
        const db = req.app.get('db')
        const { id, title, poster, overview, genre_id, release_date, disliked, watched, user_id } = req.body
        const newMovie = { id, title, poster, overview, genre_id, release_date, disliked, watched, user_id }

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
    })

movieRouter
    .route('/:movie_id/:user_id')
    // .all handles triggers for all methods (GET, DELETE, etc...)
    .all(requireAuth)
    .get((req, res, next) => {
        const db = req.app.get('db')
        MovieService.getById(db, req.params.movie_id, req.params.user_id)
        .then(movie => {
            if(!movie) { // this runs fine
                return res.status(404).json({ error: `Movie doesn't exist`})
            }
            // res.json({movie : movie});
            res.movie = movie;
            next()
            return movie;
        })
        .catch(next)
    })
    // .get(requireAuth)
    // .get((req, res, next) => {
    //     res.json(res.movie)
    // })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const { watched } = req.body;
        const updatedMovie = { watched };

        const numValues = Object.values(updatedMovie).filter(Boolean).length
        if (numValues === 0) {
             return res.status(400).json({ error: { message: 'Must not be blank '}})
        }
       

        MovieService.updateMovie(req.app.get('db'), req.params.movie_id, req.params.user_id, updatedMovie)
            .then(movie => {
                res.status(200).json(updatedMovie)
            })
            .catch(next)
    })
    

    module.exports = movieRouter