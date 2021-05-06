const MovieService = {
    getMovies(db, id) {
        return db
            .select('*').from('your_movie_list').where('user_id', id)
    },
    getById(db, id) {
        return db.from('your_movie_list').select(
            'your_movie_list.id',
            'your_movie_list.title',
            'your_movie_list.watched',
            'your_movie_list.user_id',
        )
        .where('your_movie_list.id', id).first()
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
    updateMovie(db, movie_id, newMovie) {
        return db('your_movie_list').where('id', movie_id).update(newMovie).returning('*')
        //.where('user_id', user_id).
    }
}

module.exports = MovieService