const app = require('./app');
const knex = require('knex')
const { PORT, DATABASE_URL } = require('./config');
const postgratorConfig = require('../postgrator-config');
postgratorConfig.ssl = { rejectUnauthorized: false }

const db = knex({
    client: "pg",
    connection: DATABASE_URL,
})

app.set('db', db);

app.listen(PORT, () => {
    // console.log(`Server listening at http://localhost:${PORT}`)
})