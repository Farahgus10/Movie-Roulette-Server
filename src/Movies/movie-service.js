const MovieService = {
    getMovies(db) {
        return db
            .select('*').from('your_movie_list')
    },
    insertMovie(db, newMovie) {
        return db
            .insert(newMovie).into('your_movie_list').returning('*').where(numRows => {
                return numRows[0]
            })
    },
    deleteMovie(db, movie_id) {
        return db('your_movie_list').where('id', movie_id).delete()
    },
    updateMovie(db, movie_id, newMovie) {
        return db('your_movie_list').where('id', movie_id).update(newMovie).returning('*')
    }
}

module.exports = MovieService