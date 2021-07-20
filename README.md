# Movie Roulette

### Author:
Farah Gustafson 

### Link to live app: 
[Movie Roulette](https://movie-roulette-app-6itlzl39z-farahgus.vercel.app)

### API used:
[The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api?language=en-US)

### App Summary:
Movie Roulette is the perfect app for users who just can't figure out what to watch. Instead of scrolling through Netflix and seeing the same titles over and over, Movie Roulette allows the user to randomly shuffle through hundreds of different titles. The user can narrow down results by setting their genre preferences, and they can save titles to their profile for future movie nights. "Liked" or "disliked" movies will not be shown to the user again, making it easier to avoid repeated and unwanted suggestions.


### Setup
Clone or fork this repository and the [client repository](https://github.com/Farahgus10/Movie-Roulette-client). Run npm install on the client side and server. Create a database named "movie_roulette". Create a .env file with the following information:
```
PORT=8000
TZ='UTC'
MIGRATION_DB_HOST=127.0.0.1
MIGRATION_DB_PORT=5432
MIGRATION_DB_NAME=movie_roulette
MIGRATION_DB_USER=(the username for your new database)
MIGRATION_DB_PASS=(password for your new database)
DB_URL="postgresql://(user):(password)@localhost/movie_roulette_user"
JWT_SECRET="(whatever you want here)"
```

Run npm run migrate to configure the database. In the config.js file on the client side, change the API_ENDPOINT to point to your local server. It by default is http://localhost:3000. You are good to go at this point and simply need to run npm start for the client and to start the nodemon, it's npm run dev.


### Scripts
1. Install the packages for the application npm install
2. Start the application npm start
3. Start the nodemon for the application npm run dev
4. Run the migrations up npm run migrate
5. Seed the database
6. Run the migrations down npm run migrate --0


## Authorization
You can create your own credentials by signing up and then using those credentials to login. 


### Technical Stack:
CSS, React, Nodejs, Express, PostgreSQL
