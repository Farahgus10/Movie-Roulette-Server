const MovieService = {
    getMovies(db) {
        return db
            .select('*').from('yourMovies')
    },
    insertMovies(db, newMovie) {
        return db
            .insert(newMovie).into('yourMovies').returning('*').where(numRows => {
                return numRows[0]
            })
    },
}

module.exports = MovieService