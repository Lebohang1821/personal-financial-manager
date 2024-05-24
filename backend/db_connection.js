const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust the limit based on your requirements
  host: "localhost",
  user: "root",
  password: "",
  database: "customer_infomation",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Terminate the application or handle the error appropriately
  }

  console.log("Connected to the database");
  connection.release(); // Release the connection back to the pool
});

module.exports = pool;