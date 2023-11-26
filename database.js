import mysql from "mysql2";

export const dbPool = mysql.createPool({
    host:                  'localhost',
    user:                  'root',
    database:              'testdatabase',
    waitForConnections:    true,
    connectionLimit:       10,
    maxIdle:               10,
    idleTimeout:           60000,
    queueLimit:            0,
    enableKeepAlive:       true,
    keepAliveInitialDelay: 0
}).promise();