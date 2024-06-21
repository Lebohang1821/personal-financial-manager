const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 20, // Adjust the limit based on your requirements
  host: "localhost",
  user: "root",
  password: "",
  database: "customer_information", // Fixed typo: "infomation" to "information"
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return; // Do not throw here to avoid crashing the application
  }

  if (connection) {
    console.log("Connected to the database");
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool;
