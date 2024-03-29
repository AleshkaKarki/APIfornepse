const {
    createPool
} = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "nepse porfolio",
    connectionLimit: 10
})

pool.query('select * from user where user_id = ?', [909], (err, result, fields) => {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})

module.exports= pool;