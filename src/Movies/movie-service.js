const MovieService = {
    getMovies(db) {
        return db
            .select('*').from('yourMovies')
    },
    insertMovie(db, newMovie) {
        return db
            .insert(newMovie).into('yourMovies').returning('*').where(numRows => {
                return numRows[0]
            })
    },
    deleteMovie(db, movie_id) {
        return db('yourMovies').where('id', movie_id).delete()
    },
    updateMovie(db, movie_id, newMovie) {
        return db('yourMovies').where('id', movie_id).update(newMovie).returning('*')
    }
}

module.exports = MovieService