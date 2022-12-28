const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
    connectionString: "postgres://vemofoppzqjoyk:83270ba77f119967c4262aaf447d34d7f10f4b04c03f543632a50d3f870e280a@ec2-3-217-251-77.compute-1.amazonaws.com:5432/db9n5bkg1k9nhu",
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = pool;