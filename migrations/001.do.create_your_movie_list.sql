CREATE TABLE your_movie_list (
/*    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,*/
    id INTEGER NOT NULL,
    title TEXT NOT NULL, 
    poster TEXT NOT NULL, 
    overview TEXT NOT NULL, 
    genre_id INTEGER NOT NULL, 
    release_date DATE NOT NULL
)