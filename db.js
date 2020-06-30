'use strict';

const knex = require('knex');

let knexConfig = {
    client: 'pg',
    connection: {
        host: process.env.PSQL_HOST,
        user: process.env.PSQL_USER,
        port: process.env.PSQL_PORT,
        password: process.env.PSQL_PASSWORD,
        database: process.env.PSQL_DATABASE
    }
}

const db = knex(knexConfig)
const st = require('knex-postgis')(db)

module.exports = {
    db: db,
    st: st
}

// eslint-disable-next-line
console.info('Connected to the database!');