const MovieService = {
    getMovies(db, id) {
        return db
            .select('*').from('your_movie_list').where('user_id', id)
    },
    insertMovie(db, newMovie, id) {
        return db
            // .insert(newMovie).into('your_movie_list').returning('*').where(numRows => {
            //     return numRows[0]
            // })
            .insert(newMovie).into('your_movie_list').returning('*').where('user_id', id).where(numRows => {
                return numRows[0]
            })
    },
    deleteMovie(db, movie_id) {
        return db('your_movie_list').where('id', movie_id).delete()
    },
    updateMovieList(db, movie_id, user_id, newMovie) {
        return db('your_movie_list').where('id', movie_id).where('user_id', user_id).update(newMovie).returning('*')
    }
}

module.exports = MovieService