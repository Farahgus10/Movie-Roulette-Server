const express = require('express');
const MovieService = require('./movie-service');
const jsonParser = express.json;
const path = require('path');
const movieRouter = express.Router();



movieRouter
    .route('/myMovies')
    .post(jsonParser, (req, res, next) => {
        const db = req.app.get('db')
        const { movie_id, movie_title, movie_overview, genre_id, release_date } = req.body
        const newMovie = { movie_id, movie_title, movie_overview, genre_id, release_date }

        // todo: error checking 

        MovieService
    })
