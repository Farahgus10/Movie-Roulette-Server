ALTER TABLE your_movie_list
ALTER COLUMN 
    genre_id TYPE TEXT;

ALTER TABLE your_movie_list
ADD COLUMN
    disliked BOOLEAN NOT NULL;