const Pool = require("pg").Pool;

const pool = new Pool({
    user: "beatrizlacerda",
    password: "",
    host: "localhost",
    port: 5432,
    database: "dstelecom"
});

module.exports = pool;