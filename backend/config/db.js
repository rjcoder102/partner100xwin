// config/db.js
import mysql from "mysql2/promise";



// const pool = mysql.createPool({
//     host: "167.71.239.213",
//     user: "100xwinpatner",
//     password: "100xwinpatner",
//     database: "100xwinpatner",
//     waitForConnections: true,
//     connectionLimit: 10,
//     multipleStatements: true,
// });

// export default pool;

// First database pool
const pool1 = mysql.createPool({
    host: "167.71.239.213",
    user: "100xwinpatner",
    password: "100xwinpatner",
    database: "100xwinpatner",
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true,
});

// Second database pool
const pool2 = mysql.createPool({
    host: "167.71.239.213",
    user: "winx100",
    password: "winx100",
    database: "winx100",
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true,
});

export { pool1, pool2 };


