const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    connectionString: "postgres://ckssxotmwjdfso:b933f75f5a73e990fb0ff9da2c977e8837ae1ba68f35b6cd5d2ec7d186ec6169@ec2-34-193-44-192.compute-1.amazonaws.com:5432/d8bv1tru9k6sh3",
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = pool;